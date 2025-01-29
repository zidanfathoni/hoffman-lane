"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/atoms/card"
import Link from "next/link"

interface SignInProps {
  onClick: any;
}

const RegisterForm: React.FC<SignInProps> = ({ onClick }) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log("Login attempt with:", { email, password })
    // For demo purposes, we'll just redirect to a dashboard
    router.push("/dashboard")
  }

  return (
    <>
      <div className="absolute top-0 right-0 w-32">
        <svg viewBox="0 0 100 100" className="w-full h-full text-sage-200">
          <path d="M90,10 Q50,50 90,90" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M85,15 Q45,55 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Hi There,</h1>
          <h2 className="text-2xl font-medium mb-8">Welcome to Hoffmann Lane</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Email"
              className="max-w-80 px-4 py-3 bg-[#E5E6E0] border-0 rounded-2xl"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Username"
              className="max-w-80 px-4 py-3 bg-[#E5E6E0] border-0 rounded-2xl"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>
          <div className="flex justify-center">
            <Input
              type="password"
              placeholder="Password"
              className="max-w-80 px-4 py-3 bg-[#E5E6E0] border-0 rounded-2xl"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="pt-9 justify-center flex">
            <Button type="submit" className="min-w-48 rounded-2xl bg-[#E5E6E0] text-black hover:bg-[#d8d9d3]">
              Sign Up
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          {"Have an account? "}
          <a
            onClick={onClick}
            className="text-blue-600 hover:underline">
            Login Now
          </a>
        </div>
      </div>

      {/* Bottom Palm Decoration */}
      <div className="absolute bottom-0 right-0 w-48 h-48">
        {/* <svg viewBox="0 0 100 100" className="w-full h-full text-sage-200 transform rotate-45">
          <path d="M10,90 Q50,50 90,90" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M15,85 Q55,45 85,85" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg> */}
        <img
          src="/images/palm.svg"
          alt="Palm tree"
          className="absolute bottom-0 right-0 h-60"
        />
      </div>
    </>
  )
}


export default RegisterForm