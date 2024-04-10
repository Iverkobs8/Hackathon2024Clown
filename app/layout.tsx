import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./Components/Navbar/Navbar";
import ClientOnly from "./Components/ClientOnly";
import RegisterModal from "./Components/Modals/RegisterModal";
import LoginModal from "./Components/Modals/LoginModal";
import ToasterProvider from "./Providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import UploadImageModal from "./Components/Modals/UploadImageModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Barney",
  description: "ICT HACKHATON 2024",
};
const font = Nunito({
  subsets : ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal/>
          {/* Conditionally render LoginModal */}
          {!currentUser && <LoginModal/>}
          <UploadImageModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
