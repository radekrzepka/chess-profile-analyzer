import { AnalysisForm } from "./analysis-form-schema";
import { Dispatch, SetStateAction } from "react";
import { Game } from "@/types/game";
import fetchGamesUrl from "@/utils/fetch-games-url";

export const fetchRatingHistory = async (username: string) => {
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

export const fetchUserData = async (username: string) => {
   const response = await fetch(`https://lichess.org/api/user/${username}`);

   if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
   }

   if (!response.body) {
      throw new Error("No response body found");
   }

   return response.json();
};

export const fetchGamesStream = async (
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
