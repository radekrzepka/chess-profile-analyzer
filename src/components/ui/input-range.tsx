import React, { useState, Dispatch, SetStateAction, FC } from "react";
import * as Slider from "@radix-ui/react-slider";

interface InputRangeProps {
   changeValue: Dispatch<SetStateAction<number>>;
}

const InputRange: FC<InputRangeProps> = ({ changeValue }) => {
   const [value, setValue] = useState([1]);
   const minValue = 1;
   const maxValue = 50;

   const handleValueChange = (newValue: number[]) => {
      setValue(newValue);
      changeValue(newValue[0]);
   };

   return (
      <div className="mb-2 flex items-center space-x-4">
         <Slider.Root
            className="relative flex h-5 w-[200px] touch-none select-none items-center md:w-[400px]"
            value={value}
            onValueChange={handleValueChange}
            max={maxValue}
            min={minValue}
            step={1}
         >
            <Slider.Track className="relative h-[3px] grow rounded-full bg-secondary">
               <Slider.Range className="absolute h-full rounded-full bg-accent" />
            </Slider.Track>
            <Slider.Thumb
               className="block h-4 w-4 rounded-[10px] bg-accent shadow-[0_2px_10px] shadow-black hover:bg-accent focus:shadow-black focus:outline-none"
               aria-label="Volume"
            />
         </Slider.Root>
         <span>≥ {value[0]}</span>
      </div>
   );
};

export default InputRange;
