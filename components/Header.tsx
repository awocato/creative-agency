import React from "react";
import Link from "next/link";
import { ThemeChanger } from "./theme/theme-toggle";
import { Button } from "./ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import DashboardNavbar from "./DashboardNavbar";
import { UserNav } from "./UserNav";

export default async function Header() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <header className="py-5 md:py-14 container  flex flex-row items-center justify-between gap-5  ">
      <Link href="/">
        <h1 className="font-black text-xl md:text-2xl hover:text-primary">noteSAAS</h1>
      </Link>
      <div className="md:hidden flex flex-row-reverse gap-3">
        <Drawer>
          <DrawerTrigger>
            <Menu className="cursor-pointer" />
          </DrawerTrigger>
          <DrawerContent className="">
            <nav className=" flex items-center py-16 justify-center gap-5">
              {!user ? (
                <div className="flex flex-col gap-5 w-full px-5">
                  <Button className="dark:bg-secondary dark:text-white dark:hover:bg-secondary/75">
                    <LoginLink> Sign in </LoginLink>
                  </Button>
                  <Button className="bg-slate-300 text-slate-950 hover:bg-slate-400">
                    <RegisterLink>Sign Up</RegisterLink>
                  </Button>
                </div>
              ) : (
                <DashboardNavbar />
              )}
            </nav>
          </DrawerContent>
        </Drawer>
        <div className="md:hidden flex items-center gap-3">
          <ThemeChanger />
        </div>
      </div>
      <nav className="md:flex hidden items-center">
        {(await isAuthenticated()) ? (
          <UserNav
            email={user?.email as string}
            image={user?.picture as string}
            name={user?.given_name as string}
          />
        ) : (
          <div className="flex gap-5">
            <Button className="dark:bg-secondary dark:text-white dark:hover:bg-secondary/75">
              <LoginLink>Sign in</LoginLink>
            </Button>
            <Button className="bg-slate-300 text-slate-950 hover:bg-slate-400">
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </div>
        )}
        <ThemeChanger />
      </nav>
    </header>
  );
}
