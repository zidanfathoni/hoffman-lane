"use client"
import Image from "next/image"
import LoginForm from "./login-form"
import { useState } from "react";
import RegisterForm from "./register-form";

export default function AuthModule() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="relative hidden md:block md:w-1/2">
        <Image
          src="/images/login.png"
          alt="Illuminated pathway with greenery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-0 left-0">
          <Image
            src="/images/logo.svg"
            alt="logo"
            className="h-48"
            width={150}
            height={150}
          />
        </div>
        <div className="absolute bottom-8 left-8">
          <h2 className="text-white text-2xl font-serif">Human</h2>
          <h2 className="text-white text-2xl font-serif">Habitat®</h2>
        </div>
        <div className="absolute bottom-8 right-8">
          <h2 className="text-white text-xl font-serif tracking-widest">HOFFMANN LANE</h2>
        </div>
      </div>

      {/* Form column - full width on sm and md screens */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
        {
          isLogin ? (<LoginForm onClick={handleToggle} />) : (<RegisterForm onClick={handleToggle} />)
        }
      </div>
    </div>

  )
}

