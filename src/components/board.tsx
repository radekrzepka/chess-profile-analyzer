"use client";

import classNames from "classnames";
import { FC } from "react";
import { Chessboard } from "react-chessboard";

interface BoardProps {
   className?: string;
}

const Board: FC<BoardProps> = ({ className }) => {
   return (
      <div
         className={classNames(
            "w-full place-self-center self-center lg:w-full",
            className,
         )}
      >
         <Chessboard id="BasicBoard" arePiecesDraggable={false} />
      </div>
   );
};

export default Board;
