"use client"

import { Toaster } from '@/components/atoms/toaster';
import { ReduxProvider, AppProgressBarProvider } from '@/components/molecules';
import AdminPanelLayout from '@/components/templates/admin-panel/admin-panel-layout';

import { useEffect } from 'react';
import { Storage } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import React from 'react';
import { PostLoginResponse } from '@/lib/interface/auth/post-login';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<PostLoginResponse | null>(null);

  useEffect(() => {
    const userId = Storage.get('local', 'userID');
    const user = Storage.get('local', 'user_data') as PostLoginResponse;

    setUserData(user);

    if (!userId && userData?.data.role !== 1) {
      router.push('/auth'); // Redirect ke login jika tidak ada userId
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <></>;
  }

  return (
    <ReduxProvider>
      <AppProgressBarProvider>
        <AdminPanelLayout>{children}</AdminPanelLayout>
        <Toaster />
      </AppProgressBarProvider>
    </ReduxProvider>
  );
}
