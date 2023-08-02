import { FC } from "react";
import AnalysisForm from "@/modules/analysis/analysis-form";
import Board from "@/modules/analysis/board";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
   return (
      <div className="grid lg:grid-cols-[1fr_2fr] lg:gap-6">
         <h1 className="row-start-1 mb-4 text-6xl lg:col-span-2">
            Start your analysis
         </h1>
         <Board className="row-start-3 lg:row-start-2" />
         <AnalysisForm className="row-start-2 mb-4 lg:row-start-2" />
      </div>
   );
};

export default Page;
