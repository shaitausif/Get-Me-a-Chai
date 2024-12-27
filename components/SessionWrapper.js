"use client"
import React, { Children } from 'react'
import { SessionProvider } from "next-auth/react"

const SessionWrapper = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionWrapper
