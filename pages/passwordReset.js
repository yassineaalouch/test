import Layout from "../components/Layout";
import Link from "next/link";
export default function PasswordReset() {
    return(
    <>
            <div className="bg-green-500 w-screen h-screen flex justify-center items-center">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md ">
                <h1 className="mb-2 text-3xl font-semibold text-center">Reset password</h1>
                <hr className="mb-5"/>
                <div className="pl-3 pr-3">
                        <label for= "gmail" className="block text-base mb-3 mt-4">Enter an email address where we will send your password:</label>
                        <input type="text" id="gmail" placeholder="gmail" className="border border-black rounded-md p-2 w-full" required></input>
                <div className="w-full text-center">
                        <button className="bg-green-500 py-1 px-3 rounded-md text-black font-medium shadow-md mt-3 mb-2 w-2/5">send</button>
                        <div className="w-full flex flex-col items-center">
                        <Link href={'/'} className="block w-fit"> <span className="text-blue-500 text-xs font-bold">Back to Login</span></Link>
                        </div>
                        
                </div>
                <br/>
                       
                </div>
                </div>
            </div>
    </>
    );

}