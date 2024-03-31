"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Home, Settings } from "lucide-react";

function DashboardNavbar() {
  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ];

  const pathname = usePathname();

  return (
    <nav className="grid px-5 md:px-0  w-full items-start gap-2">
      {navItems.map((item) => (
        <Link key={item.name} href={item.href}>
          <span
            className={cn(
              "group text-3xl md:mr-5 font-bold md:text-2xl md:font-medium flex items-center rounded-md px-3 py-2 dark:hover:bg-slate-700 hover:text-primary ",
              pathname === item.href ? "dark:bg-slate-700 bg-slate-200 darl:text-primary" : "bg-transparent"
            )}
          >
            <item.icon className="mr-2 h-6 w-6 md:h-5 md:w-5 " />
            <span className="">{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default DashboardNavbar;
