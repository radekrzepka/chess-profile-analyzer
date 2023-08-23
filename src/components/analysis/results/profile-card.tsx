import { FC, useState } from "react";
import { Perfs, User } from "@/types/user";
import RatingCards from "../../../modules/analysis/results/rating-cards";
import RatingChart from "@/modules/analysis/results/rating-chart";
import { RatingHistory } from "@/types/rating-history";

interface ProfileCardProps {
   userData: User | undefined;
   ratingHistory: RatingHistory[];
}

const ProfileCard: FC<ProfileCardProps> = ({ userData, ratingHistory }) => {
   const [selectedPerf, setSelectedPerf] = useState<keyof Perfs | undefined>();

   if (typeof userData === "undefined" || typeof ratingHistory === "undefined")
      return (
         <div>
            <h2 className="text-center text-4xl ">
               Please provide your data to see your profile card
            </h2>
         </div>
      );

   const { username, perfs } = userData;

   return (
      <div>
         <h2 className="text-center text-4xl ">{username}</h2>
         <RatingCards perfs={perfs} setSelectedPerf={setSelectedPerf} />
         <RatingChart
            ratingHistory={ratingHistory}
            selectedPerf={selectedPerf}
         />
      </div>
   );
};

export default ProfileCard;
