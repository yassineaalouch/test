import { useSession, signIn } from "next-auth/react"
import Nav from "@/components/Nav"
import Link from "next/link"
export default function LoginForm({children}){
        const { data: session } = useSession()
        if(!session) {
          return <>
            <div className="bg-green-500 w-screen h-screen flex justify-center items-center">
               <div className="w-96 px-6 pt-6 pb-2 shadow-lg bg-white rounded-md ">
                <h1 className="mb-2 text-3xl font-semibold text-center">Login</h1>
                <hr className="mb-5"/>
                  <div className="pl-3 pr-3">
      
                    <label htmlFor= "email" className="block text-base mb-1 mt-3">email</label>
                    <input required type="text" id="email" placeholder="email" className="border border-black rounded-md p-2 w-full"></input>
      
                    <label htmlFor= "password" className="block text-base mb-1 mt-3">Password</label>
                    <input required type="password" id="password" className="border border-black rounded-md p-2 w-full"></input> <br>
                    </br>
                    <div className="block">
                      <input type="checkbox" className="mr-2"></input>
                      <label>Remember me.</label>
                    </div>
                    <div className="w-full text-center">
                      <button className="bg-green-500 py-1 px-3 rounded-md text-black font-medium shadow-md mt-3 mb-2 w-2/5">send</button>
                      <div className="w-full flex flex-col items-center">
                        <Link href={'/passwordReset'} className="block p-0 mb-0 w-fit text-blue-500 text-sm"> <>I forgot the password</> </Link>
                        <Link href={'/CreatAccount'} className="block w-fit"> <span className="text-xs text-blue-500 mt-0 font-bold">Creat account</span> </Link>
                      </div>
                    </div>
                    <hr />
                    <div className="w-full flex justify-between px-11">
                       <button className="bg-white border border-black p-2 px-4 rounded-lg mt-3" onClick={() => signIn('google')}>google</button>
                       <button className="bg-white border border-black p-2 px-4 rounded-lg mt-3" onClick={() => signIn('facebook')}>facebook</button>
                    </div>
                    <br/>
                  </div>
               </div>
            </div>
          </>
        }
        return <>
         <div className=" bg-green-500 min-h-screen flex">
          <Nav></Nav>  {/*le menu dans le gauche dans le admine dashbord */}
          <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
              {children}{/*cette element doit se changer a chaque fois on clique sur un element dans le menu dans le dashbord : c'est lelement ou s'affiche le info ... */}
          </div>
          
         </div>
            </>

}