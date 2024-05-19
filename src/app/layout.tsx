import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../app/components/NavBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./themes/darkTheme";
import CustomBox from "./components/CustomBox";
import ThemeToggle from "./components/ThemeToggle";

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
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <ThemeToggle /> {/* Add the ThemeToggle component */}
          <CustomBox>{children}</CustomBox>
        </body>
      </html>
    </ThemeProvider>
  );
}
