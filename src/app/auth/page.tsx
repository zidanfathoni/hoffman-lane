"use client"

import MainLayout from "@/components/templates/main-layout"
import { PostLoginResponse } from "@/lib/interface/auth/post-login";
import AuthModule from "@/modules/auth"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Storage } from '@/lib/storage';



const AuthPage = () => {

  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<PostLoginResponse | null>(null);

  useEffect(() => {
    const userId = Storage.get('local', 'userID');
    const user = Storage.get('local', 'user_data') as PostLoginResponse;

    setUserData(user);

    if (!userId && userData?.data.role !== 1) {
      router.push('/auth'); // Redirect ke login jika tidak ada userId
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <></>;
  }
  return (
    // <MainLayout>
    <AuthModule />
    // </MainLayout>
  )
}

export default AuthPage