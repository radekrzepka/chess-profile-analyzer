import { Variant } from "@/enums/variant";
import { Player } from "./player";
import { Color } from "@/enums/color";

export type Game = {
   id: string;
   rated: boolean;
   variant: Variant;
   speed: Variant;
   perf: Variant;
   createdAt: number;
   lastMoveAt: number;
   status: string;
   winner?: Color;
   players: {
      white: Player;
      black: Player;
   };
   opening: {
      eco: string;
      name: string;
      ply: number;
   };
   moves: string;
   clock: {
      initial: number;
      increment: number;
      totalTime: number;
   };
};
