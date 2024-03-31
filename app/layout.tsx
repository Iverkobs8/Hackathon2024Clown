import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./Components/Navbar/Navbar";
import ClientOnly from "./Components/ClientOnly";
import RegisterModal from "./Components/Modals/RegisterModal";
import LoginModal from "./Components/Modals/LoginModal";
import ToasterProvider from "./Providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Barney",
  description: "ICT HACKHATON 2024",
};
const font = Nunito({
  subsets : ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <ToasterProvider />
        <RegisterModal/>
        <LoginModal/>
        <Navbar/>
        </ClientOnly>
        {children}</body>


    </html>
  );
}
