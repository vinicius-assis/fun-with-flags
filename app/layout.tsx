import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";

const notoSans = Noto_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fun with Flags",
  description: "Flags of the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased p-8 md:px-16 lg:px-24`}
      >
        <Header />
        <main className="flex flex-col flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
