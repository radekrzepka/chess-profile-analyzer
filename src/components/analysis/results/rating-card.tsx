import { Perf, Perfs } from "@/types/user";
import { FC, Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface RatingCardProps {
   perf: Perf;
   name: keyof Perfs;
   setSelectedPerf: Dispatch<SetStateAction<keyof Perfs | undefined>>;
}

const progressStyle = {
   progress: {
      color: "#5E9C76",
   },
   balance: {
      color: "#FCC419",
   },
   downgrade: {
      color: "#FA5252",
   },
};

const RatingCard: FC<RatingCardProps> = ({ perf, name, setSelectedPerf }) => {
   const progressState =
      perf.prog > 0 ? "progress" : perf.prog < 0 ? "downgrade" : "balance";

   return (
      <div
         className="mt-2 grid w-full place-items-center rounded border border-background px-8 py-2 text-center md:w-auto md:cursor-pointer"
         onClick={() => setSelectedPerf(name)}
      >
         <Image
            src={`/icons/card-icons/${name}.svg`}
            width={40}
            height={40}
            alt={`Icon of ${name} rating card`}
         />
         <p className="text-xl font-bold capitalize">{name}</p>
         <p className="text-sm">Rating: {perf.rating}</p>
         {perf.rd && <p className="text-sm">Rating deviation: {perf.rd}</p>}
         <p className="text-sm">
            {name === "puzzle" ? "Solved puzzles" : "Played games"}:{" "}
            {perf.games}
         </p>
         <div className="flex items-center justify-center gap-2">
            <Image
               width={24}
               height={24}
               src={`/icons/card-icons/${progressState}-arrow.svg`}
               alt="Progress arrow"
               className="inline"
            />
            <span
               style={{ color: `${progressStyle[progressState].color}` }}
               className="text-lg font-bold"
            >
               {perf.prog}
            </span>
         </div>
      </div>
   );
};

export default RatingCard;
