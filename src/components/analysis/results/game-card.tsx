import { Game } from "@/types/game";
import { FC, useRef, useState } from "react";
import { format, formatDistanceStrict } from "date-fns";
import ChessAnalysisBoard from "react-chess-analysis-board";
import "./../../../styles/board.scss";
import useWindowWidth from "@/hooks/use-window-width";
import GameCardPlayer from "./game-card-player-data";

interface GameCardProps {
   game: Game;
}

const getBoardWidth = (width: number) => {
   if (width < 768) return (width / 4) * 3;
   if (width < 1024) return (width / 3) * 2;
   return width / 3;
};

const GameCard: FC<GameCardProps> = ({ game }) => {
   const [showGame, setShowGame] = useState(false);
   const boardRef = useRef<HTMLDivElement | null>(null);
   const width = useWindowWidth();

   return (
      <div>
         <div
            className="flex cursor-pointer justify-between rounded-t-xl bg-accent p-2 text-text"
            onClick={() => {
               setShowGame((prevState) => !prevState);
               if (boardRef.current) {
                  boardRef.current.focus();
               }
            }}
         >
            <span>
               <GameCardPlayer player={game.players.white} />
               <span> - </span>
               <GameCardPlayer player={game.players.black} />
            </span>
            <span>{format(new Date(game.createdAt), " dd MMMM yyyy")}</span>
         </div>
         {showGame && (
            <div
               ref={boardRef}
               className="grid w-full cursor-pointer place-items-start gap-3 rounded-b-xl bg-accent p-2 text-text"
            >
               <div className="grid gap-1">
                  <p>
                     <span className="font-bold">Game date: </span>
                     <span>
                        {format(
                           new Date(game.createdAt),
                           "dd MMMM yyyy HH:mm:ss",
                        )}
                     </span>
                  </p>
                  <p>
                     <span className="font-bold">Game type: </span>
                     <span className="capitalize">
                        {game.rated ? "Rated" : "Casual"} {game.speed}
                     </span>
                  </p>
                  <p>
                     <span className="font-bold">Opening variation: </span>
                     <span>{game.opening?.name}</span>
                  </p>
                  <p>
                     <span className="font-bold">Game duration: </span>
                     <span>
                        {formatDistanceStrict(
                           new Date(game.createdAt),
                           new Date(game.lastMoveAt),
                        )}
                     </span>
                  </p>
                  <a
                     className="w-fit rounded-xl bg-primary px-4 py-1 text-background"
                     target="_blank"
                     href={`https://lichess.org/${game.id}`}
                  >
                     See game on lichess
                  </a>
               </div>
               <ChessAnalysisBoard
                  pgnString={game.moves}
                  config={{
                     boardConfig: {
                        ChessBoardProps: {
                           boardOrientation: game.userColor as
                              | "white"
                              | "black",
                           boardWidth: getBoardWidth(width),
                        },
                     },
                  }}
               />
            </div>
         )}
      </div>
   );
};

export default GameCard;
