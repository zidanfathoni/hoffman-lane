'use client';

import { toast } from '@/components/atoms/use-toast';
import { MainLayout } from '@/components/templates';
import OrderModules from '@/modules/order';
import { useEffect } from 'react';

export default function Order() {

  // useEffect(() => {
  //   const snapScript: string = "https://app.sandbox.midtrans.com/snap/snap.js"
  //   const clientKey: any = process.env.MIDTRANS_CLIENT_KEY

  //   const script = document.createElement('script')
  //   script.src = snapScript

  //   script.setAttribute("data-client-key", clientKey)
  //   script.async = true

  //   document.body.appendChild(script)

  //   return () => {
  //     document.body.removeChild(script)
  //     // ; (window as any).snap.pay(
  //     //   'fsdfsfsfsf',
  //     //   {
  //     //     // Optional
  //     //     onSuccess: function (result: any) {
  //     //       console.log('success');
  //     //       /* You may add your own js here, this is just example */
  //     //       toast({
  //     //         title: 'Success',
  //     //         description: `Payment Success`,
  //     //       });
  //     //     },
  //     //     // Optional
  //     //     onPending: function (result: any) {
  //     //       console.log('pending');
  //     //       /* You may add your own js here, this is just example */
  //     //       toast({
  //     //         title: 'Pending',
  //     //         description: `Payment Pending`,
  //     //       });
  //     //     },
  //     //     // Optional
  //     //     onError: function (result: any) {
  //     //       console.log('error');
  //     //       /* You may add your own js here, this is just example */
  //     //       toast({
  //     //         variant: 'destructive',
  //     //         title: 'Error',
  //     //         description: `Payment Error`,
  //     //       });
  //     //     }
  //     //   }
  //     // )
  //   }
  // }, []);

  return (
    <MainLayout>
      <OrderModules />
    </MainLayout>
  );
}
