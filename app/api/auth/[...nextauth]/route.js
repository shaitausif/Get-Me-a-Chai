import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import connectDB from '@/db/connectDb'
import User from '@/models/User'

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/dashboard', // Optional custom login page
    error: '/login'   // Redirect errors back to login
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github') {
        await connectDB()
        const existingUser = await User.findOne({ email: user.email })
        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.email.split('@')[0],
          })
        }
      }
      return true
    },
    async session({ session }) {
      const dbUser = await User.findOne({ email: session.user.email })
      if (dbUser) {
        session.user.name = dbUser.username
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
