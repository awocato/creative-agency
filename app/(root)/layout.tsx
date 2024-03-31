import Header from "@/components/Header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col px-5 md:container">
      <Header />
      {children}
    </main>
  );
}
