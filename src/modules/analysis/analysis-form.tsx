"use client";

import { FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import TextInput from "@/components/text-input";
import { analysisFormSchema, type AnalysisForm } from "./analysis-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AnalysisFormCard from "./analysis-form-card";
import classNames from "classnames";

interface AnalysisFormProps {
   className?: string;
}

const AnalysisForm: FC<AnalysisFormProps> = ({ className }) => {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<AnalysisForm>({
      resolver: zodResolver(analysisFormSchema),
   });

   return (
      <form className={classNames(className)}>
         <div>
            <AnalysisFormCard label="1. Enter your username" firstChild={true}>
               <TextInput
                  type="text"
                  id="username"
                  register={register}
                  name="username"
               />
            </AnalysisFormCard>
            <AnalysisFormCard label="2. Enter your username">
               <TextInput
                  type="text"
                  id="username"
                  register={register}
                  name="username"
               />
            </AnalysisFormCard>
            <AnalysisFormCard label="3. Enter your username" lastChild={true}>
               <TextInput
                  type="text"
                  id="username"
                  register={register}
                  name="username"
               />
            </AnalysisFormCard>
         </div>
      </form>
   );
};

export default AnalysisForm;
