import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import HomeLayout from "~/Layouts/HomeLayout";
import ExpenseItem from "~/components/ExpenseItem";
import { api } from "~/utils/api";
import dynamic from "next/dynamic";

const Plan = dynamic(() => import("~/components/Plan"));

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data, isLoading } = api.example.getExpenses.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const isLoggedIn = sessionData?.user;
  const isLoggedOut = !sessionData?.user;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeLayout>
        {isLoggedIn && <Plan />}
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
          Expenses
        </h1>
        <>
          {isLoggedOut ? (
            <div className="text-gray-500 dark:text-white">
              Please login first to see your expenses.
            </div>
          ) : isLoading ? (
            <div className="text-gray-500 dark:text-white">loading...</div>
          ) : null}
          {data && data?.length < 1 ? (
            <div className="text-gray-500 dark:text-white">
              You can add new items by tapping the plus icon below
            </div>
          ) : (
            <div className="flex w-full max-w-xl flex-col gap-2 pb-8">
              {data?.map((item) => (
                <ExpenseItem key={item.id} {...item} />
              ))}
            </div>
          )}
        </>
      </HomeLayout>
    </>
  );
};

export default Home;
