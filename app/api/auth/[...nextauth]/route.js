import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import connectDB from '@/db/connectDb'
import User from '@/models/User'
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


console.log("✅ [NextAuth] Route initialized")

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id : 'credentials',
      name : 'Credentials',
      credentials : {
                email: { label : 'Email', type : 'text', placeholder : 'Enter your Email'},
                password :{ label : 'Password', type : 'password'}
      },

      async authorize(credentials){
        // Search for the user by username or email id in the database
        await connectDB()
        try {
            const user = await User.findOne({
                email : credentials.email
            })
            // if there is no user with those credentials in the db
            if(!user){
                throw new Error('No User Found with this email')
            }

            const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
            if(isCorrectPassword){
              return user;
            }else{
              throw new Error("Incorrect Password")
            }
            
        
        } catch (err) {
            throw new Error(err)
        }
    }
    })
    ,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/dashboard',
    error: '/login',
  },
  session : {
    strategy : 'jwt'
  },
  debug : true,                                           
  callbacks: {
    async signIn({ user, account }) {
      console.log("🔑 [signIn] Callback triggered")
      try {
        if (account.provider === 'github' || account.provider === 'google') {
  
          await connectDB()
          console.log("✅ MongoDB connected")

          const existingUser = await User.findOne({ email: user.email })
          console.log(existingUser ? "🧑 User found" : "🆕 Creating new user")

          if (!existingUser) {
            await User.create({
              email: user.email,
              username: user.email.split('@')[0],
            })
            console.log("✅ User created in DB")
          }
        }
        return true
      } catch (error) {
        console.error("❌ Error in signIn callback:", error)
        return false
      }
    },

    async session({ session }) {
      console.log("🧾 [session] Callback triggered")
      try {
        const dbUser = await User.findOne({ email: session.user.email })
        if (dbUser) {
          session.user.name = dbUser.username
          console.log("✅ Username set in session:", dbUser.username)
        }
        return session
      } catch (error) {
        console.error("❌ Error in session callback:", error)
        return session
      }
    },
  },
})

export { handler as GET, handler as POST }
