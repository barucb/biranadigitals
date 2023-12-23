import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import {
  ThemeContext,
  ThemeContextProvider,
} from "@/components/context/ThemeContext";

import ThemeProvider from "@/components/providers/ThemeProvider";
import CategoryList from "@/components/categoryList/CategoryList";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Birana Digitals",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              {/* <div className="container"> */}
              <div>
                <Navbar />
                {children}
                {/* </div> */}
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
