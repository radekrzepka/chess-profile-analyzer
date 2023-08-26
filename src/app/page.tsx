"use client";

import AnalysisForm from "@/modules/analysis/form/analysis-form";
import AnalysisResults from "@/modules/analysis/results/analysis-results";
import Board from "@/components/board";
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
      <div className="grid lg:grid-cols-[1fr_2fr] lg:gap-6">
         <h1 className="row-start-1 mb-4 text-center text-4xl lg:col-span-2">
            Start your analysis
         </h1>
         <Board className="row-start-4 lg:row-start-2" />
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
      </div>
   );
};

export default Page;
