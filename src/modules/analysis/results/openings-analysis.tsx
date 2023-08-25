import { Game } from "@/types/game";
import { FC } from "react";

interface OpeningsAnalysisProps {
   games: Game[];
}

const OpeningsAnalysis: FC<OpeningsAnalysisProps> = ({ games }) => {
   // const gamesByOpening: Record<string, Game[]> = {};

   // for (const game of games) {
   //    const [openingName] = game.opening.name.split(":");
   //    if (gamesByOpening[openingName]) gamesByOpening[openingName].push(game);
   //    else gamesByOpening[openingName] = [game];
   // }

   // console.log(games, gamesByOpening);

   return (
      <div>
         {/* {Object.entries(gamesByOpening)
            .sort((a, b) => a.length - b.length)
            .map(([openingName, games]) => (
               <p key={openingName}>
                  {openingName}:{games.length}
               </p>
            ))} */}
      </div>
   );
};

export default OpeningsAnalysis;
