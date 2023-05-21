import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog",
  description: "TODO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="min-h-[calc(100vh-100px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
