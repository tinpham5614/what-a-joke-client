import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../app/components/NavBar";
import { Providers } from "./theme/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What A Joke",
  description: "A joke app that is not a joke",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ scrollBehavior: "smooth" }}
    >
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
