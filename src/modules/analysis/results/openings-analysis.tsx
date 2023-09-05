import { Game } from "@/types/game";
import { FC, useState, useMemo } from "react";
import OpeningCard from "./opening-card";
import { PlayerData } from "@/types/player";
import InputRange from "@/components/ui/input-range";
import classNames from "classnames";

interface OpeningsAnalysisProps {
   games: Game[];
   username: string;
}

const gamesWinrate = (games: Game[]) => {
   const userWinGames = games.filter(
      (game) => game.status === "userWin",
   ).length;
   return userWinGames / games.length;
};

const gamesProgress = (games: Game[]) => {
   let progress = 0;
   for (const game of games) {
      const { userColor } = game;
      if (!userColor) continue;
      console.log(game.players[userColor as "white" | "black"]);

      progress += game.players[userColor as "white" | "black"].ratingDiff ?? 0;
   }

   return progress;
};

const OpeningsAnalysis: FC<OpeningsAnalysisProps> = ({ games, username }) => {
   const [minOpeningLength, setMinOpeningLength] = useState(1);
   const [sortType, setSortType] = useState<"winrate" | "progress">("winrate");

   const gamesByOpening = useMemo(() => {
      const openings: Record<string, Game[]> = {};

      for (const game of games) {
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

         game.userColor = userColor;

         if (game.status !== "draw") {
            game.status = game.winner === userColor ? "userWin" : "userLose";
         }

         if (!game.opening) continue;

         const [openingName] = game.opening?.name.split(":");
         if (openings[openingName]) openings[openingName].push(game);
         else openings[openingName] = [game];
      }

      return openings;
   }, [games, username]);

   const filteredGames = useMemo(() => {
      return Object.entries(gamesByOpening).filter(
         ([_, games]) => games.length >= minOpeningLength,
      );
   }, [gamesByOpening, minOpeningLength]);

   const bestOpenings = useMemo(() => {
      return filteredGames
         .filter(([_, games]) => {
            if (sortType === "winrate") return gamesWinrate(games) >= 0.5;
            else return gamesProgress(games) >= 0;
         })
         .sort((a, b) => {
            if (sortType === "winrate") {
               return (
                  gamesWinrate(b[1]) - gamesWinrate(a[1]) ||
                  b[1].length - a[1].length
               );
            } else {
               return (
                  gamesProgress(b[1]) - gamesProgress(a[1]) ||
                  b[1].length - a[1].length
               );
            }
         });
   }, [filteredGames, sortType]);

   const worstOpenings = useMemo(() => {
      return filteredGames
         .filter(([_, games]) => {
            if (sortType === "winrate") return gamesWinrate(games) <= 0.5;
            else return gamesProgress(games) < 0;
         })
         .sort((a, b) => {
            if (sortType === "winrate") {
               return (
                  gamesWinrate(b[1]) - gamesWinrate(a[1]) ||
                  b[1].length - a[1].length
               );
            } else {
               return (
                  gamesProgress(b[1]) - gamesProgress(a[1]) ||
                  b[1].length - a[1].length
               );
            }
         });
   }, [filteredGames, sortType]);

   return (
      <>
         {games.length !== 0 && (
            <div className="grid place-items-center">
               <h3 className="my-6 text-center text-4xl font-bold">
                  Openings analysis
               </h3>
               <p className="text-center">Show openings with games played:</p>
               <InputRange changeValue={setMinOpeningLength} />
               <div className="flex gap-2">
                  <button
                     className={classNames(
                        "w-fit rounded-xl bg-accent px-4 py-1 text-text",
                        sortType === "winrate" && "bg-secondary",
                     )}
                     onClick={() => setSortType("winrate")}
                  >
                     Sort by winrate
                  </button>
                  <button
                     className={classNames(
                        "w-fit rounded-xl bg-accent px-4 py-1 text-text",
                        sortType === "progress" && "bg-secondary",
                     )}
                     onClick={() => setSortType("progress")}
                  >
                     Sort by rating progress
                  </button>
               </div>
            </div>
         )}
         <div className="grid min-h-[600px] lg:grid-cols-2">
            <div>
               {games.length !== 0 && (
                  <h3 className="text-center text-xl font-bold">
                     Best openings
                  </h3>
               )}
               {bestOpenings.map(([openingName, games]) => (
                  <OpeningCard
                     key={openingName}
                     name={openingName}
                     games={games}
                  />
               ))}
            </div>
            <div>
               {games.length !== 0 && (
                  <h3 className="text-center text-xl font-bold">
                     Worst openings
                  </h3>
               )}
               {worstOpenings.map(([openingName, games]) => (
                  <OpeningCard
                     key={openingName}
                     name={openingName}
                     games={games}
                  />
               ))}
            </div>
         </div>
      </>
   );
};

export default OpeningsAnalysis;
