import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { SnackbarProvider } from "notistack";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider autoHideDuration={2000}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
