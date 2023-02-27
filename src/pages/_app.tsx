import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "~/context/counter";
import { CountdownProvider } from "~/context/countdown";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <CountdownProvider>
          <Component {...pageProps} />
        </CountdownProvider>
      </StoreProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
