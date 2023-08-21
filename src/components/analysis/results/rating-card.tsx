import { Perf, Perfs } from "@/types/user";
import { FC } from "react";
import ProgressArrow from "@/assets/progress-arrow.svg";
import DowngradeArrow from "@/assets/downgrade-arrow.svg";
import Image from "next/image";

interface RatingCardProps {
   perf: Perf;
   name: string;
}

const RatingCard: FC<RatingCardProps> = ({ perf, name }) => {
   const isProgress = perf.prog > 0;

   return (
      <div className="cursor-pointer rounded border border-background px-4 py-2 text-center">
         <p className="text-xl font-bold capitalize">{name}</p>
         <p>{perf.rating}</p>
         <div className="flex items-center justify-center">
            <Image
               width={24}
               height={24}
               src={isProgress ? ProgressArrow : DowngradeArrow}
               alt="Progress arrow"
               className="inline"
            />
            <span
               className={`text-lg font-bold ${
                  isProgress ? "text-[#52BFA1]" : "text-[#FA5252]"
               }`}
            >
               {perf.prog}
            </span>
         </div>
      </div>
   );
};

export default RatingCard;
