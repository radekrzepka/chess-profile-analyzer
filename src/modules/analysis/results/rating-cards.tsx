import RatingCard from "@/components/analysis/results/rating-card";
import { Perfs, Perf } from "@/types/user";
import { FC, useMemo } from "react";

interface RatingCardsProps {
   perfs: Perfs;
}

const perfKeys = [
   "ultraBullet",
   "bullet",
   "blitz",
   "rapid",
   "classical",
   "puzzle",
];

const RatingCards: FC<RatingCardsProps> = ({ perfs }) => {
   const filteredPerfs: Perfs = useMemo(() => {
      const filteredEntries = Object.entries(perfs)
         .filter(
            ([key, value]) => perfKeys.includes(key as any) && !value?.prov,
         )
         .sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

      return filteredEntries.reduce((obj, [key, value]) => {
         obj[key as keyof Perfs] = value;
         return obj;
      }, {} as Perfs);
   }, [perfs]);

   return (
      <div className="flex w-full flex-wrap justify-around gap-2">
         {Object.keys(filteredPerfs).map((key) => (
            <RatingCard
               key={key}
               perf={filteredPerfs[key as keyof Perfs] as Perf}
               name={key}
            />
         ))}
      </div>
   );
};

export default RatingCards;
