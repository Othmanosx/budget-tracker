import React, { type ReactNode } from "react";
import BottomNav from "~/components/BottomNav";
import TopBar from "~/components/TopBar";

interface Props {
  children: ReactNode;
  title: string;
}
const HomeLayout = ({ children, title }: Props) => {
  return (
    <>
      <TopBar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-300 dark:bg-gradient-to-b dark:from-[#2e026d] dark:to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {children}
        </div>
      </main>
      <BottomNav />
    </>
  );
};

export default HomeLayout;
