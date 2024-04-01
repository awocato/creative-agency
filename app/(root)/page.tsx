import React from "react";
import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return (
    <section className="flex items-center justify-center md:h-[70vh] h-[75vh]">
      <div className="relative items-center w-full max-w-7xl px-5 py-12 mx-auto lg:px-16 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full dark:bg-secondary/35 bg-primary text-white font-bold text-sm">
              sort your notes easily
            </span>
            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              create notes with ease
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-slate-600 dark:text-secondary/50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              unde itaque dolorem ducimus pariatur rerum.
            </p>
          </div>
          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <Button size="lg" className="w-full rounded-md">
              <RegisterLink className="text-lg font-bold" >
                sign up for free
              </RegisterLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
