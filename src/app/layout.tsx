import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Betting paradize",
  description: "Betting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-[#0C0B14]`}>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
