import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import classNames from "classnames";

interface InputProps<T extends FieldValues> {
   type: "text" | "date";
   placeholder?: string;
   id: string;
   register: UseFormRegister<T>;
   name: Path<T>;
   className?: string;
   disabled?: boolean;
}

const Input = <T extends FieldValues>({
   type,
   placeholder,
   id,
   register,
   name,
   className,
   disabled = false,
}: InputProps<T>) => {
   return (
      <input
         {...register(name)}
         type={type}
         placeholder={placeholder}
         id={id}
         disabled={disabled}
         className={classNames(
            "rounded-md px-4 py-1 text-background placeholder:text-[#d6d6d6]",
            className,
         )}
      />
   );
};

export default Input;
