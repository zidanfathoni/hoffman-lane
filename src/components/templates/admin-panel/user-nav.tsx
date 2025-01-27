'use client';

import { LayoutGrid, LogOut, User } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar';
import { Button } from '@/components/atoms/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/atoms/tooltip';
import { useState } from 'react';
import { useEffect } from 'react';
import { Storage } from '@/lib/storage';
import { PostLoginResponse } from '@/lib/interface/auth/post-login';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const router = useRouter()


  const [userData, setUserData] = useState<PostLoginResponse | null>(null);

  useEffect(() => {
    const userId = Storage.get('local', 'userID');
    const user = Storage.get('local', 'user_data') as PostLoginResponse;

    setUserData(user);
  }, []);

  //onclick, remove local storage
  const handleSignOut = () => {
    Storage.remove('local', 'userID');
    Storage.remove('local', 'user_data');

    router.push('/');
  };


  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData?.data.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData?.data.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {
          handleSignOut();
        }}>
          <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
