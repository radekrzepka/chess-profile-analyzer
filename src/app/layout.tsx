import "@/styles/globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navigation from "@/modules/navigation";
import Providers from "@/utils/providers";
import { Toaster } from "react-hot-toast";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
   title: "Lichess profile analyzer",
   description: `Welcome to our chess analysis web app, where we bring the power of data-driven insights to your lichess.org profile! Our app provides a comprehensive suite of tools to help you improve your chess game and gain a deeper understanding of your playing style.`,
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body
            className={`${spaceGrotesk.className} bg-background p-5 text-text`}
         >
            <Providers>
               <Navigation />
               <main className="mt-5">{children}</main>
               <Toaster position="bottom-right" />
            </Providers>
         </body>
      </html>
   );
}
