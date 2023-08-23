import { Game } from "@/types/game";
import { FC } from "react";

interface OpeningsAnalysisProps {
   games: Game[];
}

const OpeningsAnalysis: FC<OpeningsAnalysisProps> = ({ games }) => {
   if (games.length === 0) return null;

   return (
      <div>
         {/* {games.map((game) => (
            <p key={game.id}>{game.opening.name}</p>
         ))} */}
      </div>
   );
};

export default OpeningsAnalysis;
