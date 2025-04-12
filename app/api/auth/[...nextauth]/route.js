import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import connectDB from '@/db/connectDb'
import User from '@/models/User'

console.log("✅ [NextAuth] Route initialized")

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/dashboard',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("🔑 [signIn] Callback triggered")
      try {
        if (account?.provider === 'github') {
          console.log("🌐 GitHub login detected")
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
