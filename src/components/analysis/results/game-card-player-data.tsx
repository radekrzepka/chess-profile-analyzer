import { Player } from "@/types/player";
import classNames from "classnames";
import { FC } from "react";

interface GameCardPlayerProps {
   player: Player;
}

const GameCardPlayer: FC<GameCardPlayerProps> = ({ player }) => {
   const playerNick = `${
      player.user === "Anonymous" ? "Anonymous" : player.user.name
   }`;
   const playerRating = `${!!player.rating ? `(${player.rating})` : ""}`;

   return (
      <span>
         {playerNick} {playerRating}{" "}
         {player.ratingDiff && (
            <span
               className={classNames(
                  player.ratingDiff > 0 ? "text-green-800" : "text-red-800",
                  "font-bold",
               )}
            >
               {player.ratingDiff > 0 && "+"}
               {player.ratingDiff}
            </span>
         )}
      </span>
   );
};

export default GameCardPlayer;
