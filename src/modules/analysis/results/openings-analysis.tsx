import { Game } from "@/types/game";
import { FC } from "react";
import OpeningCard from "./opening-card";
import { PlayerData } from "@/types/player";

interface OpeningsAnalysisProps {
   games: Game[];
   username: string;
}

const OpeningsAnalysis: FC<OpeningsAnalysisProps> = ({ games, username }) => {
   const gamesByOpening: Record<string, Game[]> = {};

   for (const game of games) {
      // console.log(game);

      let userColor;

      if (Object.keys(game.players.black).length === 0) {
         game.players.black = { user: "Anonymous" };
         userColor = "white";
      } else if (Object.keys(game.players.white).length === 0) {
         game.players.white = { user: "Anonymous" };
         userColor = "black";
      } else {
         userColor =
            (game.players.black.user as PlayerData).id === username
               ? "black"
               : "white";
      }

      if (game.status !== "draw") {
         game.status = game.winner === userColor ? "userWin" : "userLose";
      }

      if (!game.opening) continue;

      const [openingName] = game.opening?.name.split(":");
      if (gamesByOpening[openingName]) gamesByOpening[openingName].push(game);
      else gamesByOpening[openingName] = [game];
   }

   const sorted = Object.entries(gamesByOpening).sort(
      (a, b) => b[1].length - a[1].length,
   );

   return (
      <>
         {games.length !== 0 && (
            <h3 className="my-4 text-center text-3xl font-bold">
               Openings analysis
            </h3>
         )}
         <div>
            {sorted.map(([openingName, games]) => (
               <OpeningCard
                  key={openingName}
                  name={openingName}
                  games={games}
               />
            ))}
         </div>
      </>
   );
};

export default OpeningsAnalysis;
