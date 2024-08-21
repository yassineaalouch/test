import mongooseConnect from "@/lib/mongoose";
import User from "@/models/User";
export async function POST(req,res){
    try{
        const {method} = req;
        await mongooseConnect();
        const {username,gmail,password} = await req.json();
        if (method === 'POST'){
            const  {username,gmail,password}= req.body;
            const UserDoc = await User.create({
                username,gmail,password
            })
            res.json(UserDoc);
        }
        return;
    }catch(error){
        console.log(error);
    }
}