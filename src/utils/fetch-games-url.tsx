import { AnalysisForm } from "@/modules/analysis/analysis-form-schema";
import { format, parseISO } from "date-fns";

const LICHESS_API_MIN_TIMESTAMP = 1356998400070;

const filterOption = (options: Object, paramName: string) => {
   const selectedOptions = Object.keys(options).filter(
      (key) => options[key as keyof typeof options],
   );
   if (paramName === "rated" && selectedOptions.length === 1) {
      return `&${paramName}=${selectedOptions[0]}`;
   }
   if (paramName !== "rated" && selectedOptions.length !== 0)
      return `&${paramName}=${selectedOptions}`;
   return "";
};

const convertDate = (date: Date) => {
   return typeof date === "string" ? new Date(date) : date;
};

const getTimeStamp = (date: Date) => {
   return date.getTime() > LICHESS_API_MIN_TIMESTAMP
      ? date.getTime()
      : LICHESS_API_MIN_TIMESTAMP;
};

const fetchGamesUrl = ({
   username,
   startAnalysisDate,
   endAnalysisDate,
   colors,
   variants,
   gameTypes,
   opponentUsername,
}: AnalysisForm) => {
   let url = `https://lichess.org/api/games/user/${username}?opening=true`;

   const additionalFilters = `${filterOption(colors, "color")}${filterOption(
      variants,
      "perfType",
   )}${filterOption(gameTypes, "rated")}`;
   url += additionalFilters;

   if (startAnalysisDate)
      url += `&since${getTimeStamp(convertDate(startAnalysisDate))}`;
   if (endAnalysisDate)
      url += `&since${getTimeStamp(convertDate(endAnalysisDate))}`;

   url += opponentUsername ? `&vs=${opponentUsername}` : "";
   console.log(url);

   return url;
};

export default fetchGamesUrl;
