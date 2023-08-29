import { FC } from "react";
import { User } from "@/types/user";
import { formatDistanceToNow, format } from "date-fns";

interface UserStatsProps {
   userData: User;
}

const UserStats: FC<UserStatsProps> = ({ userData }) => {
   return (
      <div>
         <p>
            <span className="font-bold">Account created: </span>
            {format(new Date(userData.createdAt), "dd MMMM yyyy")}
         </p>
         <p>
            <span className="font-bold">Last time seen on Lichess: </span>
            {formatDistanceToNow(new Date(userData.seenAt))} ago
         </p>
      </div>
   );
};

export default UserStats;
