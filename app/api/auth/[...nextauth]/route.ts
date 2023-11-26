import bcrypt from 'bcryptjs'
import dbConnect from '@/backend/config/dbConnect'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import User, { IUser } from '@/backend/models/user'

type Credentials = {
  email: string
  password: string
}

type Token = {
  user: IUser
}

async function auth(req: NextRequest, res: any) {
  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Credentials) {
          dbConnect()
          const { email, password } = credentials
          const user = await User.findOne({ email }).select('+password')
          if (!user) {
            throw new Error('Invalid email or password')
          }

          const isPasswordMatched = await bcrypt.compare(password, user.password)

          if (!isPasswordMatched) {
            throw new Error('Invalid email or password')
          }

          return user
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        console.log(token, user)

        user && (token.user = user)

        // TODO: update session when user is updated

        return token
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser

        console.log('Session -> ', session)
        return session
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  })
}

export { auth as GET, auth as POST }
