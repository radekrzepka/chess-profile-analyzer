import { Game } from "@/types/game";
import { FC } from "react";

interface GameCardProps {
   game: Game;
}

const GameCard: FC<GameCardProps> = ({ game }) => {
   return (
      <div
         className="cursor-pointer rounded-xl bg-accent p-2 text-text"
         onClick={() =>
            window.open(`https://www.lichess.org/${game.id}`, "_blank")
         }
      >
         {game.players.white.user.name} ({game.players.white.rating}) -{" "}
         {game.players.black.user.name} ({game.players.black.rating})
      </div>
   );
};

export default GameCard;
