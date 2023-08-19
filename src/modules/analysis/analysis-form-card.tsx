import classNames from "classnames";
import { FC, ReactNode, useEffect, useState } from "react";

interface AnalysisFormCardProps {
   children: ReactNode;
   label: string;
   openedForm: boolean;
   className?: string;
   firstChild?: boolean;
   lastChild?: boolean;
}

const AnalysisFormCard: FC<AnalysisFormCardProps> = ({
   children,
   label,
   openedForm,
   className,
   firstChild,
   lastChild,
}) => {
   const [opened, setOpened] = useState(false);

   useEffect(() => {
      setOpened(openedForm);
   }, [openedForm]);

   const onClickHandler = (event: React.MouseEvent) => {
      event.preventDefault();
      setOpened((prevState) => !prevState);
   };

   return (
      <div className={classNames(className, "relative text-background")}>
         <div
            className={classNames(
               "w-full cursor-pointer bg-primary p-3 text-left",
               firstChild && "rounded-t-xl",
            )}
            onClick={onClickHandler}
         >
            {label}
         </div>
         <div
            className={classNames(
               "overflow-hidden transition-all delay-150 duration-500 ease-in-out",
               opened
                  ? "max-h-[200px] p-3 opacity-100"
                  : "max-h-0 p-0 opacity-0",
               lastChild && "rounded-b-xl",
               "bg-accent",
            )}
         >
            {children}
         </div>
      </div>
   );
};

export default AnalysisFormCard;
