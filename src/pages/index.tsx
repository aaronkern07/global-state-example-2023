import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import Counter from "~/components/Counter"
import Countdown from "~/components/Countdown";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-7xl font-extrabold tracking-tight text-white sm:text-[3rem]">
            Global <span className="text-[hsl(280,100%,70%)]">State</span> Example
          </h1>
          <p className="mt-4 text-lg text-white">
            In our project, we are using global state to share data and functionality across multiple components. 
            Specifically, we are using <strong>useReducer</strong> and <strong>useContext</strong> to manage our global state. 
            We have a number of different components that all need access to this global state, and we are able to keep the state in a central location using a context object.
            By doing this, we are able to make our code more modular and reusable. 
            We can create small, encapsulated components that only focus on their own specific functionality, without having to worry about managing global state. 
            This makes our code easier to read, easier to maintain, and easier to reason about.
          </p>
          <Counter />
          <Countdown />
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
