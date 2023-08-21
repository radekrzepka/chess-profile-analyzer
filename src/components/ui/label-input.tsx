import {
   UseFormRegister,
   FieldValues,
   Path,
   FieldErrors,
} from "react-hook-form";
import Input from "./input";
import ErrorMessage from "./error-message";

interface LabelInputProps<T extends FieldValues> {
   label: string;
   inputType: "text" | "date";
   register: UseFormRegister<T>;
   name: Path<T>;
   errors: FieldErrors<T>;
}

const LabelInput = <T extends FieldValues>({
   label,
   inputType,
   register,
   name,
   errors,
}: LabelInputProps<T>) => {
   return (
      <div className="mt-1">
         <label className="mr-3 text-lg font-bold" htmlFor={name}>
            {label}
         </label>
         <Input
            id={name}
            type={inputType}
            register={register}
            name={name}
            className={!errors[name] ? "mb-1" : ""}
         />
         {errors[name]?.message && (
            <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
         )}
      </div>
   );
};

export default LabelInput;
