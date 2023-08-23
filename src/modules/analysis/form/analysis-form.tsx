"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Perfs, Perf } from "@/types/user";
import { FC, useMemo, useRef } from "react";
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
import { useState, Dispatch, SetStateAction } from "react";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import { RatingHistory } from "@/types/rating-history";
import LabelInput from "@/components/ui/label-input";
import CheckboxFilter from "@/components/ui/checkbox-filter";
import checkboxesOptions from "../checkboxes-options";
import fetchGamesUrl from "@/utils/fetch-games-url";

interface AnalysisFormProps {
   setGames: Dispatch<SetStateAction<Game[]>>;
   setUserData: Dispatch<SetStateAction<User | undefined>>;
   setRatingHistory: Dispatch<SetStateAction<RatingHistory[]>>;
   games: Game[];
}

const fetchRatingHistory = async (username: string) => {
   const response = await fetch(
      `https://lichess.org/api/user/${username}/rating-history`,
   );

   if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
   }

   if (!response.body) {
      throw new Error("No response body found");
   }

   return response.json();
};

const fetchUserData = async (username: string) => {
   const response = await fetch(`https://lichess.org/api/user/${username}`);

   if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
   }

   if (!response.body) {
      throw new Error("No response body found");
   }

   return response.json();
};

const fetchGamesStream = async (
   formValues: AnalysisForm,
   setGames: Dispatch<SetStateAction<Game[]>>,
   signal: AbortSignal,
) => {
   const url = fetchGamesUrl(formValues);

   const response = await fetch(url, {
      headers: {
         "Content-Type": "application/x-ndjson",
         Accept: "application/x-ndjson",
      },
      signal: signal,
   });

   if (!response.ok) {
      throw new Error(
         `Username ${formValues.username} doesn't exist. Please change username.`,
      );
   }

   if (!response.body) {
      throw new Error("No response body found");
   }

   const reader = response.body.getReader();
   let gamesFounded = false;

   while (true) {
      const { done, value } = await reader.read();

      if (done) {
         break;
      }

      gamesFounded = true;

      const newGames = new TextDecoder()
         .decode(value)
         .split("\n")
         .filter(Boolean)
         .map((game) => JSON.parse(game));

      newGames.forEach((game) => {
         setGames((prevGames) => [...prevGames, game]);
      });
   }

   if (!gamesFounded) {
      throw new Error(
         "No games founded for selected filters. Please changes filters.",
      );
   }

   return response;
};

const AnalysisForm: FC<AnalysisFormProps> = ({
   setUserData,
   setGames,
   setRatingHistory,
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

   const username = getValues("username");
   const queryClient = useQueryClient();
   const abortController = useRef(new AbortController());
   const [fetchData, setFetchData] = useState(false);

   const userDataQuery = useQuery({
      queryKey: ["userData", username],
      queryFn: () => fetchUserData(username),
      refetchOnWindowFocus: false,
      enabled: fetchData,
      retry: 0,
   });

   const ratingHistoryQuery = useQuery({
      queryKey: ["ratingHistory", username],
      queryFn: () => fetchRatingHistory(username),
      refetchOnWindowFocus: false,
      enabled: fetchData,
      retry: 0,
   });

   const gamesQuery = useQuery({
      queryKey: ["games", username],
      queryFn: () =>
         fetchGamesStream(watch(), setGames, abortController.current.signal),
      refetchOnWindowFocus: false,
      enabled: fetchData,
      retry: 0,
   });

   setUserData(userDataQuery.data);
   setRatingHistory(ratingHistoryQuery.data);

   if (gamesQuery.isError && gamesQuery.error instanceof Error) {
      toast.error(gamesQuery.error.message);
   }

   const onSubmit = () => {
      abortController.current = new AbortController();
      setFetchData(true);

      queryClient.invalidateQueries(["userData", username]);
      queryClient.invalidateQueries(["ratingHistory", username]);
      queryClient.invalidateQueries(["games", username]);
   };

   const disableForm = useMemo(() => games.length !== 0, [games.length]);

   return (
      <form
         className="row-start-2 mb-4 justify-center lg:row-start-2"
         onSubmit={handleSubmit(onSubmit)}
      >
         <AnalysisFormCard label="1. Enter your username" firstChild={true}>
            <LabelInput
               register={register}
               inputType="text"
               name="username"
               errors={errors}
               label="Username:"
               disabled={disableForm}
            />
         </AnalysisFormCard>
         <AnalysisFormCard label="2. Select date">
            <LabelInput
               register={register}
               inputType="date"
               name="startAnalysisDate"
               errors={errors}
               label="Start of analysis: "
               disabled={disableForm}
            />
            <LabelInput
               register={register}
               inputType="date"
               name="endAnalysisDate"
               errors={errors}
               label="End of analysis: "
               disabled={disableForm}
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
                        disabled={disableForm}
                     />
                  ))}
               </div>
               <LabelInput
                  register={register}
                  inputType="text"
                  name="opponentUsername"
                  errors={errors}
                  label="Opponent's name: "
                  disabled={disableForm}
               />
            </div>
         </AnalysisFormCard>
         <div className="flex w-full justify-around">
            <button
               className="my-3 rounded-xl bg-primary px-16 py-3 text-background disabled:bg-accent"
               type="submit"
               disabled={disableForm}
            >
               {!gamesQuery.isFetched && games.length !== 0 ? (
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
                  setGames([]);
                  setFetchData(false);
                  abortController.current.abort();
                  queryClient.cancelQueries({ queryKey: ["games", username] });
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
