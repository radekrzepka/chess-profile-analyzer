"use client";

import AnalysisForm from "@/modules/analysis/form/analysis-form";
import AnalysisResults from "@/modules/analysis/results/analysis-results";
import { useState } from "react";
import { Game } from "@/types/game";
import { User } from "@/types/user";
import { RatingHistory } from "@/types/rating-history";

const Page = () => {
   const [games, setGames] = useState<Game[]>([]);
   const [userData, setUserData] = useState<User | undefined>();
   const [ratingHistory, setRatingHistory] = useState<RatingHistory[]>([]);
   const [username, setUsername] = useState("");

   return (
      <>
         <h1 className="mb-4 text-center text-4xl">Start your analysis</h1>
         <AnalysisForm
            setGames={setGames}
            games={games}
            setUserData={setUserData}
            setRatingHistory={setRatingHistory}
            setUsername={setUsername}
         />
         <AnalysisResults
            games={games}
            userData={userData}
            ratingHistory={ratingHistory}
            username={username}
         />
      </>
   );
};

export default Page;
