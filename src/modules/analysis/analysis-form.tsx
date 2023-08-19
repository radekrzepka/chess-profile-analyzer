"use client";

import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/components/text-input";
import { analysisFormSchema, type AnalysisForm } from "./analysis-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AnalysisFormCard from "./analysis-form-card";
import { Game } from "@/types/game";
import { useQueries } from "@tanstack/react-query";
import { useState, Dispatch, SetStateAction } from "react";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import { RatingHistory } from "@/types/rating-history";

interface AnalysisFormProps {
   setGames: Dispatch<SetStateAction<Game[]>>;
   setUserData: Dispatch<SetStateAction<User | null | undefined>>;
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
   username: string,
   setGames: Dispatch<SetStateAction<Game[]>>,
) => {
   const response = await fetch(
      `https://lichess.org/api/games/user/${username}?opening=true&max=100`,
      {
         headers: {
            "Content-Type": "application/x-ndjson",
            Accept: "application/x-ndjson",
         },
      },
   );

   if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
   }

   if (!response.body) {
      throw new Error("No response body found");
   }

   const reader = response.body.getReader();

   while (true) {
      const { done, value } = await reader.read();

      if (done) {
         break;
      }

      const newGames = new TextDecoder()
         .decode(value)
         .split("\n")
         .filter(Boolean)
         .map((game) => JSON.parse(game));

      newGames.forEach((game) => {
         setGames((prevGames) => [...prevGames, game]);
      });
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
      formState: { errors },
   } = useForm<AnalysisForm>({
      resolver: zodResolver(analysisFormSchema),
   });

   const { username } = getValues();

   const [fetchData, setFetchData] = useState(false);
   const [openForms, setOpenForms] = useState(false);

   const results = useQueries({
      queries: [
         {
            queryKey: ["userData", username],
            queryFn: () => fetchUserData(username),
            refetchOnWindowFocus: false,
            enabled: fetchData,
            retry: 0,
         },
         {
            queryKey: ["ratingHistory", username],
            queryFn: () => fetchRatingHistory(username),
            refetchOnWindowFocus: false,
            enabled: fetchData,
            retry: 0,
         },
         {
            queryKey: ["games", username],
            queryFn: () => fetchGamesStream(username, setGames),
            refetchOnWindowFocus: false,
            enabled: fetchData,
            retry: 0,
         },
      ],
   });

   const [userDataQuery, ratingHistoryQuery, gamesQuery] = results;

   useEffect(() => {
      if (userDataQuery.isSuccess) {
         setUserData(userDataQuery.data);
      }
      if (ratingHistoryQuery.isSuccess) {
         setRatingHistory(ratingHistoryQuery.data);
      }

      if (gamesQuery.isError) {
         toast.error(`User ${username} not found`);
      }
   }, [
      userDataQuery,
      ratingHistoryQuery,
      gamesQuery,
      setUserData,
      setRatingHistory,
      username,
   ]);

   const onSubmit = () => {
      setFetchData(true);
   };

   useEffect(() => {
      const isFormError = () => Object.keys(errors).length !== 0;
      setOpenForms(isFormError);
      setFetchData(isFormError);
   }, [errors]);

   const disableButton = useMemo(() => games.length !== 0, [games.length]);

   return (
      <form
         className="row-start-2 mb-4 justify-center lg:row-start-2"
         onSubmit={handleSubmit(onSubmit)}
      >
         <AnalysisFormCard
            label="1. Enter your username"
            firstChild={true}
            openedForm={openForms}
         >
            <TextInput
               type="text"
               id="username"
               register={register}
               name="username"
               className="w-4/5 md:w-1/2"
            />
         </AnalysisFormCard>
         <AnalysisFormCard
            label="2. Enter your username"
            openedForm={openForms}
         >
            d
         </AnalysisFormCard>
         <AnalysisFormCard
            label="3. Enter your username"
            lastChild={true}
            openedForm={openForms}
         >
            d
         </AnalysisFormCard>
         <div className="grid w-full place-items-center sm:place-content-start">
            <button
               className="my-3 rounded-xl bg-primary px-16 py-3 text-background disabled:bg-accent"
               type="submit"
               disabled={disableButton}
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
         </div>
         <p>Fetched games: {games.length}</p>
      </form>
   );
};

export default AnalysisForm;
