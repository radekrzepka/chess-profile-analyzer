import ProfileCard from "@/components/analysis/results/profile-card";
import { Game } from "@/types/game";
import { RatingHistory } from "@/types/rating-history";
import { User } from "@/types/user";
import { FC } from "react";
import OpeningsAnalysis from "./openings-analysis";

interface AnalysisResultsProps {
   games: Game[];
   userData: User | undefined;
   ratingHistory: RatingHistory[];
}

const AnalysisResults: FC<AnalysisResultsProps> = ({
   games,
   userData,
   ratingHistory,
}) => {
   return (
      <div className="my-3 min-h-[300px] w-full rounded-xl bg-primary p-3 text-background lg:col-span-2">
         <ProfileCard userData={userData} ratingHistory={ratingHistory} />
         <OpeningsAnalysis games={games} />
      </div>
   );
};

export default AnalysisResults;
