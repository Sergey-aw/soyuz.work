import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Коворкинг Союз в Туле",
  description: "Коворкинг в самом центре города",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      
      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <link rel="icon" href="/logo.svg" type="image/svg+xml"/>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="sitemap" href="/sitemap-index.xml" />
      <meta property="og:url" content="https://soyuz.work/"/>
      <meta property="og:title" content="Коворкинг Союз в Туле"/>
      <meta property="og:type" content="website"/>
      <meta property="og:description" content="Удобное место для работы в самом центре Тулы"/>
      <meta property="og:image" content="/coworking_soyuz.jpg"/>
      <meta property="og:image:alt" content="Коворкинг Soyuz.work в Туле"/>
      <meta name="theme-color" content="#fff" />


      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
