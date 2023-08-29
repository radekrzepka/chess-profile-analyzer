import RatingCard from "@/components/analysis/results/rating-card";
import { Perfs, Perf } from "@/types/user";
import { FC, useMemo, Dispatch, SetStateAction } from "react";

interface RatingCardsProps {
   perfs: Perfs;
   setSelectedPerf: Dispatch<SetStateAction<keyof Perfs | undefined>>;
}

const perfKeys = [
   "ultraBullet",
   "bullet",
   "blitz",
   "rapid",
   "classical",
   "puzzle",
];

const RatingCards: FC<RatingCardsProps> = ({ perfs, setSelectedPerf }) => {
   const filteredPerfs: Perfs = useMemo(() => {
      const filteredEntries = Object.entries(perfs).filter(
         ([key, value]) => perfKeys.includes(key as any) && !value?.prov,
      );

      return filteredEntries.reduce((obj, [key, value]) => {
         obj[key as keyof Perfs] = value;
         return obj;
      }, {} as Perfs);
   }, [perfs]);

   return (
      <div className="flex w-full flex-wrap justify-around gap-2">
         {Object.keys(filteredPerfs)
            .sort((a, b) => perfKeys.indexOf(a) - perfKeys.indexOf(b))
            .map((key) => (
               <RatingCard
                  key={key}
                  perf={filteredPerfs[key as keyof Perfs] as Perf}
                  name={key as keyof Perfs}
                  setSelectedPerf={setSelectedPerf}
               />
            ))}
      </div>
   );
};

export default RatingCards;
