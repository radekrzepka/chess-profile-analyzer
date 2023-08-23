import { FC, useMemo } from "react";
import { RatingHistory } from "@/types/rating-history";
import { Perfs } from "@/types/user";
import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   Tooltip,
   Brush,
   ResponsiveContainer,
} from "recharts";

interface RatingChartProps {
   ratingHistory: RatingHistory[];
   selectedPerf: keyof Perfs | undefined;
}

const RatingChart: FC<RatingChartProps> = ({ ratingHistory, selectedPerf }) => {
   const selectedPerfRatingHistory = useMemo(() => {
      return ratingHistory.find(
         (record) => record.name.toLocaleLowerCase() === selectedPerf,
      );
   }, [ratingHistory, selectedPerf]);

   const ratingHistoryArray = useMemo(() => {
      return selectedPerfRatingHistory?.points.map((record) => {
         return {
            date: `${record[0]}-${record[1] + 1}-${record[2]}`,
            rating: record[3],
         };
      });
   }, [selectedPerfRatingHistory]);

   const minRating = useMemo(() => {
      return ratingHistoryArray
         ? Math.min(...ratingHistoryArray.map((item) => item.rating))
         : 0;
   }, [ratingHistoryArray]);

   if (!selectedPerf) {
      return (
         <div className="grid h-[500px] w-full place-items-center">
            <p className="text-3xl">Please select one of tempo to show chart</p>
         </div>
      );
   }

   if (selectedPerf === "puzzle") {
      return (
         <div className="grid h-[500px] w-full place-items-center">
            <p className="text-3xl">Chart not available for puzzles</p>
         </div>
      );
   }

   return (
      <div className="h-[500px] w-full">
         <ResponsiveContainer width="100%" height="100%">
            <LineChart
               width={500}
               height={300}
               data={ratingHistoryArray}
               margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
               }}
            >
               <XAxis dataKey="date" />
               <YAxis domain={[minRating, "auto"]} />
               <Tooltip />
               <Line
                  dataKey="rating"
                  stroke="#8884d8"
                  dot={false}
                  activeDot={{ r: 8 }}
               />
               <Brush dataKey={"date"} />
            </LineChart>
         </ResponsiveContainer>
      </div>
   );
};

export default RatingChart;
