import { Game } from "@/types/game";
import { FC } from "react";
import OpeningCard from "./opening-card";

interface OpeningsAnalysisProps {
   games: Game[];
   username: string;
}

const OpeningsAnalysis: FC<OpeningsAnalysisProps> = ({ games, username }) => {
   const gamesByOpening: Record<string, Game[]> = {};

   for (const game of games) {
      const userColor =
         game.players.black.user.id === username ? "black" : "white";
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
         <h3 className="my-4 text-center text-3xl font-bold">
            Openings analysis
         </h3>
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
