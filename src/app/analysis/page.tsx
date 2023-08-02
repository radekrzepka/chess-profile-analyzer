import { FC } from "react";
import AnalysisForm from "@/modules/analysis/analysis-form";
import Board from "@/modules/analysis/board";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
   return (
      <div className="grid grid-cols-2">
         <h1 className="col-span-2 text-6xl">Start your analysis</h1>
         <Board />
         <AnalysisForm />
      </div>
   );
};

export default Page;
