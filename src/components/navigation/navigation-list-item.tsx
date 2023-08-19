"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface NavigationListItemProps {
   path: string;
   newTab?: boolean;
   children: ReactNode;
}

const NavigationListItem: FC<NavigationListItemProps> = ({
   path,
   children,
   newTab = false,
}) => {
   const pathname = usePathname();
   const isSelected = pathname === path;

   return (
      <li className="transition-all hover:text-gray-400">
         <Link
            className={classNames(
               isSelected && "bg-primary text-background hover:text-gray-600",
               "block rounded-xl px-6 py-2",
            )}
            href={path}
            prefetch={!newTab}
            target={newTab ? "_blank" : "_self"}
         >
            {children}
         </Link>
      </li>
   );
};

export default NavigationListItem;
