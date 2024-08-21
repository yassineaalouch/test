import Layout from "../components/Layout";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
    return (
      <Layout>
          <div className="text-blue-900 flex justify-between">
              <h2>
                Hello, <b>{session?.user?.name}</b>
              </h2>
              <div className="flex bg-gray-300 gap-1 text-black rounded-full overflow-hidden">
                <img src={session?.user?.image} alt=""  className="rounded-full w-6 h-6"/>
                <span className="px-2">
                  {session?.user?.name}
                </span>
                <button onClick={()=> signOut('/')}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                  </svg>      
                </button>
              </div>
          </div>
      </Layout>
    );
  }