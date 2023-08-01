import "@/styles/globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Navigation from "@/modules/navigation";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
   title: "Lichess profile analyzer",
   description: "Generate your profile data",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={`${ubuntu.className} bg-background p-5 text-text`}>
            <Navigation />
            <main className="mt-5">{children}</main>
         </body>
      </html>
   );
}
