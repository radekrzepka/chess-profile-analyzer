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
import format from "date-fns/format";

interface RatingChartProps {
   ratingHistory: RatingHistory[];
   selectedPerf: keyof Perfs | undefined;
}

interface RatingHistoryChartObject {
   date: string | number;
   month?: string;
   rating: number;
}

const MS_IN_DAY = 86400000;

const transformDate = (timestamp: number) => {
   return format(new Date(timestamp), "dd MMMM yyyy");
};

const transformDateWithoutDay = (timestamp: number) => {
   return format(new Date(timestamp), "MMMM yyyy");
};

const fillMissingDates = (
   ratingHistory: Array<RatingHistoryChartObject> | undefined,
) => {
   const filledRatingHistory: Array<RatingHistoryChartObject> = [];

   if (typeof ratingHistory === "undefined") return filledRatingHistory;

   for (let i = 0; i < ratingHistory.length - 1; i++) {
      filledRatingHistory.push({
         date: transformDate(ratingHistory[i].date as number),
         month: transformDateWithoutDay(ratingHistory[i].date as number),
         rating: ratingHistory[i].rating,
      });

      let newDate = (ratingHistory[i].date as number) + MS_IN_DAY;

      while ((ratingHistory[i + 1].date as number) > newDate) {
         filledRatingHistory.push({
            date: transformDate(newDate),
            month: transformDateWithoutDay(newDate),
            rating: ratingHistory[i].rating,
         });
         newDate += MS_IN_DAY;
      }
   }

   return filledRatingHistory;
};

interface CustomTooltipProps {
   active?: boolean;
   payload?: any[];
}

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
   if (active && payload && payload.length) {
      return (
         <div className="rounded-md bg-accent p-3 text-white shadow-lg">
            <p className="mb-1 font-bold">{`Date: ${payload[0].payload.date}`}</p>
            <p>{`Rating: ${payload[0].value}`}</p>
         </div>
      );
   }

   return null;
};

const RatingChart: FC<RatingChartProps> = ({ ratingHistory, selectedPerf }) => {
   const selectedPerfRatingHistory = useMemo(() => {
      return ratingHistory.find(
         (record) => record.name.toLocaleLowerCase() === selectedPerf,
      );
   }, [ratingHistory, selectedPerf]);

   const ratingHistoryArray = useMemo(() => {
      return selectedPerfRatingHistory?.points.map((record) => {
         return {
            date: new Date(record[0], record[1], record[2]).getTime(),
            rating: record[3],
         };
      });
   }, [selectedPerfRatingHistory]);

   const minRating = useMemo(() => {
      return ratingHistoryArray
         ? Math.min(...ratingHistoryArray.map((item) => item.rating))
         : 0;
   }, [ratingHistoryArray]);

   const maxRating = useMemo(() => {
      return ratingHistoryArray
         ? Math.max(...ratingHistoryArray.map((item) => item.rating))
         : 0;
   }, [ratingHistoryArray]);

   const filledHistory = useMemo(() => {
      return fillMissingDates(ratingHistoryArray);
   }, [ratingHistoryArray]);

   if (!selectedPerf) {
      return (
         <div className="hidden h-[500px] w-full place-items-center md:grid">
            <p className="text-center text-3xl">
               Please select one of tempo to show chart
            </p>
         </div>
      );
   }

   if (selectedPerf === "puzzle") {
      return (
         <div className="hidden h-[500px] w-full place-items-center md:grid">
            <p className="text-center text-3xl">
               Chart not available for puzzles
            </p>
         </div>
      );
   }

   return (
      <div className="mb-16 hidden h-[500px] w-full md:block">
         <h2 className="my-2 text-center text-2xl font-bold capitalize">
            {selectedPerf}
         </h2>
         <ResponsiveContainer width="100%" height="100%">
            <LineChart height={400} data={filledHistory} margin={{ right: 35 }}>
               <XAxis dataKey="month" />
               <YAxis domain={[minRating, maxRating]} />
               <Tooltip content={<CustomTooltip />} />
               <Line
                  dataKey="rating"
                  stroke="#0c1a27"
                  dot={false}
                  activeDot={{ r: 8 }}
               />
               <Brush dataKey="month" height={30} stroke="#0c1a27" />
            </LineChart>
         </ResponsiveContainer>
      </div>
   );
};

export default RatingChart;
