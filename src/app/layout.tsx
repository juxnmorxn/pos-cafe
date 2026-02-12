import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Cafetería - Menú Digital",
  description: "Menú digital interactivo con los mejores cafés, postres y alimentos",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover",
  themeColor: "#b45309",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "La Cafetería",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#F8F8F8]`}
      >
        {children}
      </body>
    </html>
  );
}
