import DashboardNavbar from "@/components/DashboardNavbar";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { currentUser } from "@clerk/nextjs";
import { stripe } from "@/lib/stripe";
async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) {
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
        profileImage: profileImage,
      },
    });
  }

  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: email,
    });

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stripeCustomerId: data.id,
      },
    });
  }
}

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  await getData({
    email: user?.externalAccounts[0].emailAddress as string,
    firstName: user?.firstName as string,
    id: user?.id as string,
    lastName: user?.lastName as string,
    profileImage: user?.imageUrl as string,
  });

  return (
    <div className="flex flex-col space-y-6 mt-6 pb-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNavbar />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
