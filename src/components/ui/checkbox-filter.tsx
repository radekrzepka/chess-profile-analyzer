import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface Option {
   label: string;
   value: string;
}

interface CheckboxFilterProps<T extends FieldValues> {
   label: string;
   options: Array<Option>;
   register: UseFormRegister<T>;
   name: Path<T>;
}

const CheckboxFilter = <T extends FieldValues>({
   label,
   options,
   register,
   name,
}: CheckboxFilterProps<T>) => {
   return (
      <fieldset>
         <legend className="mb-1 text-lg font-bold">{label}: </legend>
         <div className="ml-2">
            {options.map((option) => (
               <div key={option.value} className="mb-1">
                  <input
                     {...register(`${name}.${option.value}` as Path<T>)}
                     type="checkbox"
                     name={`${name}.${option.value}`}
                     id={`${name}.${option.value}`}
                     className="mr-2 scale-125 accent-primary"
                  />
                  <label
                     className="text-lg"
                     htmlFor={`${name}.${option.value}`}
                  >
                     {option.label}
                  </label>
               </div>
            ))}
         </div>
      </fieldset>
   );
};

export default CheckboxFilter;
