import { Game } from "@/types/game";
import { FC, useState } from "react";
import { Player } from "@/types/player";
import { format } from "date-fns";
import ChessAnalysisBoard from "react-chess-analysis-board";
import "./../../../styles/board.scss";
import useWindowWidth from "@/hooks/use-window-width";

interface GameCardProps {
   game: Game;
}

const showPlayerData = (player: Player) =>
   `${player.user === "Anonymous" ? "Anonymous" : player.user.name} ${
      !!player.rating ? `(${player.rating})` : ""
   }`;

const GameCard: FC<GameCardProps> = ({ game }) => {
   const [showBoard, setShowBoard] = useState(false);
   const width = useWindowWidth();

   return (
      <div>
         <div
            className="cursor-pointer rounded-t-xl bg-accent p-2 text-text"
            onClick={() => setShowBoard((prevState) => !prevState)}
         >
            {`${showPlayerData(game.players.white)} - `}
            {showPlayerData(game.players.black)}
         </div>
         {showBoard && (
            <div className="grid w-full cursor-pointer place-items-center gap-8 rounded-b-xl bg-accent p-2 text-text lg:grid-cols-[2fr_1fr] lg:place-items-start">
               <ChessAnalysisBoard
                  pgnString={game.moves}
                  config={{
                     boardConfig: {
                        ChessBoardProps: {
                           boardWidth: width < 1024 ? 300 : 600,
                        },
                     },
                  }}
               />
               <div>
                  <p>
                     <span className="font-bold">Game Date: </span>
                     {format(new Date(game.createdAt), "dd MMMM yyyy HH:mm:ss")}
                  </p>
               </div>
            </div>
         )}
      </div>
   );
};

export default GameCard;
