"use client";

import AnalysisForm from "@/modules/analysis/analysis-form";
import Board from "@/components/board";
import ProfileCard from "@/components/profile-card";
import { useState } from "react";
import { Game } from "@/types/game";
import { User } from "@/types/user";
import { RatingHistory } from "@/types/rating-history";

const Page = () => {
   const [games, setGames] = useState<Game[]>([]);
   const [userData, setUserData] = useState<User | null>();
   const [ratingHistory, setRatingHistory] = useState<RatingHistory[]>([]);

   console.log(userData, ratingHistory);

   return (
      <div className="grid lg:grid-cols-[1fr_2fr] lg:gap-6">
         <h1 className="row-start-1 mb-4 text-center text-4xl lg:col-span-2">
            Start your analysis
         </h1>
         <Board className="row-start-3 lg:row-start-2" />
         <AnalysisForm
            setGames={setGames}
            games={games}
            setUserData={setUserData}
            setRatingHistory={setRatingHistory}
         />
         <ProfileCard />
      </div>
   );
};

export default Page;
