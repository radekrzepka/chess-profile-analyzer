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
               "overflow-hidden transition-all duration-300 ease-in-out",
               opened ? "h-auto p-3 opacity-100" : "h-0 opacity-60",
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
