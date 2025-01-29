// utils/auth.ts
import { toast } from '@/components/atoms/use-toast';
import { api } from '../axios/instance';
import { Storage } from '../storage';
import { PostLoginResponse } from '../interface/auth/post-login';

// Simpan user login ke variabel
let currentUser: PostLoginResponse | null = null;

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await api.post<PostLoginResponse>(
      `/users/login`,
      JSON.stringify({
        identifier: email,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    // Simpan userID di localStorage dan ke variabel interface
    if (response.data.status === true) {
      currentUser = {
        status: response.data.status,
        message: response.data.message,
        data: {
          id: response.data.data.id,
          username: response.data.data.username,
          email: response.data.data.email,
          password: response.data.data.password,
          role: response.data.data.role,
          id_user: response.data.data.id_user,
        }
      };

      // Simpan userId ke localStorage
      Storage.set('local', 'userID', response.data.data.id_user.toString());
      Storage.set('local', 'user_data', currentUser);

      toast({
        title: 'Success',
        description: `Login successful! UserID: ${response.data.data.id_user}`,
      });

      // Handle successful login (e.g., redirect or set auth state)
    }
  } catch (error: any) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to login',
    });
  }
};

export const getCurrentUser = (): PostLoginResponse | null => currentUser;




// const { userID } = response.data['data'];
// Storage.set('local', 'userID', userID);

// console.log('Login successful:', userID);