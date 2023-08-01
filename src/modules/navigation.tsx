import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import ChessPawnIcon from "./../assets/chess-pawn.svg";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = ({}) => {
   return (
      <nav className="">
         <ul className="flex items-center justify-between">
            <li className="hidden md:block">
               <Link href="/">
                  <Image src={ChessPawnIcon} alt="Chess pawn icon" width={64} />
               </Link>
            </li>
            <div className="flex w-full items-center justify-around gap-4 text-center md:w-auto md:justify-center md:gap-6">
               <li>
                  <Link href="/analysis">Analysis</Link>
               </li>
               <li>
                  <Link href="/openings">Openings</Link>
               </li>
               <li>
                  <Link href="/previous-analysis">Previous analysis</Link>
               </li>
            </div>
         </ul>
      </nav>
   );
};

export default Navigation;
