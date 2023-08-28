"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
   FC,
   useMemo,
   useRef,
   useEffect,
   useCallback,
   useState,
   Dispatch,
   SetStateAction,
} from "react";
import { useForm } from "react-hook-form";
import {
   analysisFormSchema,
   type AnalysisForm,
   defaultFormValues,
} from "./analysis-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AnalysisFormCard from "./analysis-form-card";
import { Game } from "@/types/game";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import { RatingHistory } from "@/types/rating-history";
import LabelInput from "@/components/ui/label-input";
import CheckboxFilter from "@/components/ui/checkbox-filter";
import checkboxesOptions from "../checkboxes-options";
import { usePathname, useSearchParams } from "next/navigation";
import {
   fetchUserData,
   fetchGamesStream,
   fetchRatingHistory,
} from "./fetch-data-functions";

interface AnalysisFormProps {
   setGames: Dispatch<SetStateAction<Game[]>>;
   setUserData: Dispatch<SetStateAction<User | undefined>>;
   setRatingHistory: Dispatch<SetStateAction<RatingHistory[]>>;
   setUsername: Dispatch<SetStateAction<string>>;
   games: Game[];
}

const AnalysisForm: FC<AnalysisFormProps> = ({
   setUserData,
   setGames,
   setRatingHistory,
   setUsername,
   games,
}) => {
   const {
      register,
      handleSubmit,
      getValues,
      watch,
      formState: { errors },
   } = useForm<AnalysisForm>({
      resolver: zodResolver(analysisFormSchema),
      defaultValues: defaultFormValues,
   });

   const queryClient = useQueryClient();
   const abortController = useRef(new AbortController());
   const [fetchData, setFetchData] = useState(false);
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const username = watch("username");

   const queriesSettings = {
      refetchOnWindowFocus: false,
      enabled: fetchData,
      retry: 0,
   };

   const userDataQuery = useQuery({
      queryKey: ["userData", username],
      queryFn: () => fetchUserData(username),
      ...queriesSettings,
   });

   const ratingHistoryQuery = useQuery({
      queryKey: ["ratingHistory", username],
      queryFn: () => fetchRatingHistory(username),
      ...queriesSettings,
   });

   const gamesQuery = useQuery({
      queryKey: ["games", username],
      queryFn: () =>
         fetchGamesStream(watch(), setGames, abortController.current.signal),
      ...queriesSettings,
   });

   setUserData(userDataQuery.data);
   setRatingHistory(ratingHistoryQuery.data);

   const onSubmit = () => {
      if (fetchData) {
         abortController.current.abort();
      }

      setGames([]);
      abortController.current = new AbortController();
      setFetchData(true);
      setUsername(username);

      queryClient.invalidateQueries(["userData", username]);
      queryClient.invalidateQueries(["ratingHistory", username]);
      queryClient.invalidateQueries(["games", username]);
   };

   const resetForm = useCallback(() => {
      setFetchData(false);

      abortController.current.abort();
      queryClient.cancelQueries({ queryKey: ["games", username] });
   }, [queryClient, username]);

   useEffect(() => {
      if (gamesQuery.isError && gamesQuery.error instanceof Error) {
         toast.error(gamesQuery.error.message);
      }
   }, [gamesQuery.error, gamesQuery.isError]);

   useEffect(() => {
      if (!fetchData) {
         resetForm();
      }
   }, [resetForm, pathname, searchParams, fetchData]);

   useEffect(() => {
      return () => {
         abortController.current.abort();
      };
   }, []);

   return (
      <form className="mb-4 justify-center" onSubmit={handleSubmit(onSubmit)}>
         <AnalysisFormCard label="1. Enter your username" firstChild={true}>
            <LabelInput
               register={register}
               inputType="text"
               name="username"
               errors={errors}
               label="Username:"
               disabled={fetchData}
            />
         </AnalysisFormCard>
         <AnalysisFormCard label="2. Select date">
            <LabelInput
               register={register}
               inputType="date"
               name="startAnalysisDate"
               errors={errors}
               label="Start of analysis: "
               disabled={fetchData}
            />
            <LabelInput
               register={register}
               inputType="date"
               name="endAnalysisDate"
               errors={errors}
               label="End of analysis: "
               disabled={fetchData}
            />
            <p className="my-1">
               (If you want to get all of your games, leave this empty)
            </p>
         </AnalysisFormCard>
         <AnalysisFormCard
            label="3. Additional filters (optional)"
            lastChild={true}
         >
            <div>
               <div className="grid lg:grid-cols-3">
                  {checkboxesOptions.map((option) => (
                     <CheckboxFilter
                        key={option.name}
                        label={option.label}
                        register={register}
                        options={option.options}
                        name={option.name as keyof AnalysisForm}
                        disabled={fetchData}
                     />
                  ))}
               </div>
               <LabelInput
                  register={register}
                  inputType="text"
                  name="opponentUsername"
                  errors={errors}
                  label="Opponent's name: "
                  disabled={fetchData}
               />
            </div>
         </AnalysisFormCard>
         <div className="flex w-full flex-wrap justify-around">
            <button
               className="my-3 rounded-xl bg-primary px-16 py-3 text-background disabled:bg-accent"
               type="submit"
               disabled={fetchData}
            >
               {!gamesQuery.isFetched && games.length !== 0 && fetchData ? (
                  <span>
                     <BeatLoader
                        color="#110f1f"
                        loading={true}
                        size={10}
                        className="relative top-[2px] grid"
                     />
                  </span>
               ) : (
                  "Analyse"
               )}
            </button>
            <button
               className="my-3 rounded-xl bg-primary px-16 py-3 text-background disabled:bg-accent"
               onClick={(e) => {
                  e.preventDefault();
                  if (fetchData) {
                     abortController.current.abort();
                  }
                  resetForm();
               }}
            >
               Stop
            </button>
            <button
               className="my-3 rounded-xl bg-primary px-16 py-3 text-background disabled:bg-accent"
               onClick={(e) => {
                  e.preventDefault();
                  if (fetchData) {
                     abortController.current.abort();
                  }
                  resetForm();
                  setGames([]);
               }}
            >
               Reset
            </button>
         </div>
         <p>Fetched games: {games.length}</p>
      </form>
   );
};

export default AnalysisForm;
