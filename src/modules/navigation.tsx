import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import ChessPawnIcon from "./../assets/chess-pawn.svg";
import NavigationListItem from "@/components/navigation/navigation-list-item";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = ({}) => {
   return (
      <nav>
         <ul className="flex flex-col items-center justify-between md:flex-row">
            <li className="mb-4 md:mb-0">
               <Link href="/">
                  <Image src={ChessPawnIcon} alt="Chess pawn icon" width={64} />
               </Link>
            </li>
            <div className="flex w-full flex-col items-center justify-around gap-4 text-center md:w-auto md:flex-row md:justify-center md:gap-6">
               <NavigationListItem path="/analysis">
                  Analysis
               </NavigationListItem>
               <NavigationListItem path="/openings">
                  Openings
               </NavigationListItem>
               <NavigationListItem path="/previous-analysis">
                  Previous analysis
               </NavigationListItem>
               <NavigationListItem
                  path="https://github.com/radekrzepka/chess-profile-analyzer"
                  newTab={true}
               >
                  GitHub
               </NavigationListItem>
               <NavigationListItem path="https://lichess.org/" newTab={true}>
                  Lichess
               </NavigationListItem>
            </div>
         </ul>
      </nav>
   );
};

export default Navigation;
