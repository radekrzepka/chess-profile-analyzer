import { FC } from "react";
import { User } from "@/types/user";
import RatingCards from "../../../modules/analysis/results/rating-cards";

interface ProfileCardProps {
   userData: User | undefined;
}

const ProfileCard: FC<ProfileCardProps> = ({ userData }) => {
   if (typeof userData === "undefined")
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
         <RatingCards perfs={perfs} />
      </div>
   );
};

export default ProfileCard;
