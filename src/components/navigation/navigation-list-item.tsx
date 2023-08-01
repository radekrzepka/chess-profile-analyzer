"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface NavigationListItemProps {
   path: string;
   children: ReactNode;
}

const NavigationListItem: FC<NavigationListItemProps> = ({
   path,
   children,
}) => {
   const pathname = usePathname();
   const isSelected = pathname === path;

   return (
      <li className="transition-all hover:text-gray-400">
         <Link
            className={classNames(isSelected && "text-gray-400")}
            href={path}
         >
            {children}
         </Link>
      </li>
   );
};

export default NavigationListItem;