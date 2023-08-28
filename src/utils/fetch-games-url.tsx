import { AnalysisForm } from "@/modules/analysis/form/analysis-form-schema";

const LICHESS_API_MIN_TIMESTAMP = 1356998400070;

const filterOption = (options: Object, paramName: string) => {
   const selectedOptions = Object.keys(options).filter(
      (key) => options[key as keyof typeof options],
   );
   if (paramName === "rated" && selectedOptions.length === 1) {
      return `&${paramName}=${
         selectedOptions[0] === "rated" ? "true" : "false"
      }`;
   }
   if (paramName === "color" && selectedOptions.length === 1)
      return `&${paramName}=${selectedOptions[0]}`;

   if (
      paramName !== "rated" &&
      paramName !== "color" &&
      selectedOptions.length !== 0
   )
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
   let url = `https://lichess.org/api/games/user/${username}?opening=true&pgnInJson=true`;

   url += opponentUsername ? `&vs=${opponentUsername}` : "";

   const additionalFilters = `${filterOption(
      variants,
      "perfType",
   )}${filterOption(gameTypes, "rated")}${filterOption(colors, "color")}`;
   url += additionalFilters;

   if (startAnalysisDate) {
      url += `&since=${getTimeStamp(convertDate(startAnalysisDate))}`;
   }

   if (endAnalysisDate)
      url += `&until=${getTimeStamp(convertDate(endAnalysisDate)) + 86399999}`;

   return url;
};

export default fetchGamesUrl;
