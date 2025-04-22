import bcrypt from 'bcryptjs'
import connectDB from '@/db/connectDb'
import User from '@/models/User'



export async function POST(req){
    const { email , password } = await req.json()
    try {
        await connectDB()

        const existingUser = await User.findOne( 
            {email : email}
        )
        if(existingUser){
            return Response.json({
                success : false,
                message : 'User already exists'
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            email : email,
            username : email.split('@')[0],
            password : hashedPassword
        })
        return Response.json(
            {
                success : true,
                message : "User Created Successfully"
            },{status : 200}
        )



    } catch (error) {
        return Response.json(
            {
                success : false,
                message: "Error while registering the User"
            },{status : 500}
        )
    }
}