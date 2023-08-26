import classNames from "classnames";
import { Game } from "@/types/game";
import { FC, useMemo, useState } from "react";
import GameCard from "@/components/analysis/results/game-card";

interface OpeningCardProps {
   name: string;
   games: Game[];
}

const OpeningCard: FC<OpeningCardProps> = ({ name, games }) => {
   const [opened, setOpened] = useState(false);

   const wonGamesNumber = useMemo(
      () =>
         games.reduce((accumulator, currentGame) => {
            return currentGame.status === "userWin"
               ? ++accumulator
               : accumulator;
         }, 0),
      [games],
   );

   const userWinGames = games.filter((game) => game.status === "userWin");
   const drawGames = games.filter((game) => game.status === "draw");
   const userLoseGames = games.filter((game) => game.status === "userLose");

   const sortedGames = [
      { label: "Won games", games: userWinGames },
      { label: "Draw games", games: drawGames },
      { label: "Lost games", games: userLoseGames },
   ];

   const onClickHandler = (event: React.MouseEvent) => {
      event.preventDefault();
      setOpened((prevState) => !prevState);
   };

   console.log(games);

   return (
      <div className="relative m-2 rounded-xl text-text">
         <div
            className={classNames(
               "flex w-full cursor-pointer justify-between rounded-t-xl bg-accent p-3 text-left",
            )}
            onClick={onClickHandler}
         >
            <p>{name}</p>
            <p>
               <span className="mr-2">
                  {wonGamesNumber}/{games.length}
               </span>
               {((wonGamesNumber / games.length) * 100).toFixed(2)} %
            </p>
         </div>
         <div
            className={classNames(
               "overflow-hidden rounded-b-xl transition-all duration-300 ease-in-out",
               opened
                  ? "h-auto border-2 border-accent p-3 opacity-100 "
                  : "h-0 opacity-60",
               "bg-primary",
            )}
         >
            {sortedGames.map((category) => (
               <div
                  key={category.label}
                  className="mb-2 ml-4 text-xl text-background"
               >
                  <h3>{category.label}</h3>
                  <div className="grid gap-2">
                     {category.games.map((game) => (
                        <GameCard key={game.id} game={game} />
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default OpeningCard;
