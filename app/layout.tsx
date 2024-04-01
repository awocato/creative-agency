import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "noteSAAS",
  description: "Notes app with billing and authentication",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saas-rho-topaz.vercel.app/",
    images: [
      {
        url: "https://i.postimg.cc/9ffZR2gB/logodark.png",
        alt: "noteSAAS",
      },
    ],
  },
};
async function getData(userId: string) {
  noStore();
  if (userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        colorScheme: true,
      },
    });
    return data;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${data?.colorScheme}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
