import React from "react";
import Link from "next/link";
import { ThemeChanger } from "./theme/theme-toggle";
import { Button } from "./ui/button";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import DashboardNavbar from "./DashboardNavbar";

export default async function Header() {
  const user = await currentUser();
  const homeLink = !user ? "/" : "/dashboard";

  return (
    <header className="py-5 md:py-14 md:container  flex flex-row items-center justify-between gap-5  ">
      <Link href={homeLink}>
        <h1 className="font-black text-3xl md:text-2xl">noteSAAS</h1>
      </Link>
      <div className="md:hidden flex flex-row-reverse gap-3">
        <Drawer>
          <DrawerTrigger>
            <Menu className="cursor-pointer" />
          </DrawerTrigger>
          <DrawerContent className="">
            <nav className=" flex items-center py-16 justify-center gap-5">
              {!user ? (
                <div className="flex flex-col gap-5 w-full p">
                  <Button className="dark:bg-secondary dark:text-white dark:hover:bg-secondary/75">
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                  <Button className="bg-slate-300 text-slate-950 hover:bg-slate-400">
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              ) : (
                <DashboardNavbar/>
              )}
              
            </nav>
          </DrawerContent>
        </Drawer>
        <div className="md:hidden flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <ThemeChanger />
        </div>
      </div>
      <nav className="md:flex hidden items-center gap-5">
        {!user ? (
          <>
            <Button className="dark:bg-secondary dark:text-white dark:hover:bg-secondary/75">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button className="bg-slate-300 text-slate-950 hover:bg-slate-400">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
        <ThemeChanger />
      </nav>
    </header>
  );
}
