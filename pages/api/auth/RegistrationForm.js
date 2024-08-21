import Layout from "@/components/Layout";
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
export default function RegistrationForm(){
  const { data: session } = useSession()
  if(!session) {
    return(
        <>
                <div className="bg-green-500 w-screen h-screen flex justify-center items-center">
             <div className="w-96 px-6 pt-6 pb-2 shadow-lg bg-white rounded-md ">
              <h1 className="mb-2 text-3xl font-semibold text-center">Creat Account</h1>
              <hr className="mb-5"/>
                <div className="pl-3 pr-3">
                  <label for= "username" className="block text-base mb-1">Username</label>
                  <input required type="text" id="username" placeholder="name" className="border border-black rounded-md p-2 w-full"></input>
    
                  <label for= "gmail" className="block text-base mb-1 mt-3">Gmail</label>
                  <input required type="text" id="gmail" placeholder="gmail" className="border border-black rounded-md p-2 w-full"></input>
    
                  <label for= "password" className="block text-base mb-1 mt-3">Password</label>
                  <input required type="password" id="password" className="border border-black rounded-md p-2 w-full"></input> <br>
    
                  </br>
                  <div className="block">
                    <input required type="checkbox" className="mr-2 "></input>
                    <label className="text-xs" >I agree all <Link href={'/conditions'} target="_blank" className=" w-fit "> <span className="text-xs text-blue-500 mt-0 font-bold">terms and conditions.</span> </Link> </label>
                  </div>
                  <div className="w-full text-center">
                    <button className="bg-green-500 py-1 px-3 rounded-md text-black font-medium shadow-md mt-3 mb-2 w-2/5">send</button>
                    <div className="w-full flex flex-col items-center">
                        <Link href={'/'} className="block w-fit"> <span className="text-xs text-blue-500 mt-0 font-bold">Back to login</span> </Link>
                    </div>
                   
                  </div>
                  <br/>
                  <hr className=" "/>
                  <div className="w-full flex justify-between px-11">
                     <button className="bg-white border border-black p-2 px-4 rounded-lg mt-3 m" onClick={() => signIn('google')}><img src="../public/GL.png" alt="google"></img></button>
                     <button className="bg-white border border-black p-2 px-4 rounded-lg mt-3" onClick={() => signIn('google')}><img src="../public/FB.png" alt="facebook"></img></button>
                  </div>
                </div>
             </div>
          </div>
        </>
        );
    }
    return<><Layout></Layout></>

}