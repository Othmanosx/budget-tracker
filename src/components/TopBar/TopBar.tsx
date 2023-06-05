import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Spinner from "../Spinner";
import Avatar from "../Avatar";

const TopBar = () => {
  const { data: sessionData, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  return (
    <nav className="fixed left-0 top-0 z-20 w-full border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className=" hidden items-center sm:visible sm:flex">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ">
            Budget Tracker
          </span>
        </div>
        {isLoading ? (
          <Spinner />
        ) : isLoggedIn ? (
          <Avatar
            name={sessionData?.user.name?.split(" ")[0]}
            image={sessionData?.user.image}
          />
        ) : null}
        <button
          type="button"
          className="rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </nav>
  );
};

export default TopBar;
