import classNames from "classnames";
import { FC, ReactNode, useState } from "react";

interface AnalysisFormCardProps {
   children: ReactNode;
   label: string;
   className?: string;
   firstChild?: boolean;
   lastChild?: boolean;
}

const AnalysisFormCard: FC<AnalysisFormCardProps> = ({
   children,
   label,
   className,
   firstChild,
   lastChild,
}) => {
   const [opened, setOpened] = useState(false);

   const onClickHandler = (event: React.MouseEvent) => {
      event.preventDefault();
      setOpened((prevState) => !prevState);
   };

   return (
      <div className={classNames(className, "text-background")}>
         <button
            className={classNames(
               "w-full cursor-pointer bg-primary p-3 text-left",
               firstChild && "rounded-t-xl",
               lastChild && !opened && "rounded-b-xl",
            )}
            onClick={onClickHandler}
         >
            {label}
         </button>
         <div
            className={classNames(
               !opened && "hidden",
               lastChild && "rounded-b-xl",
               "bg-accent p-3",
            )}
         >
            {children}
         </div>
      </div>
   );
};

export default AnalysisFormCard;
