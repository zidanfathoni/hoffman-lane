'use client';

import { MainLayout } from '@/components/templates';
import OrderModules from '@/modules/order';

export default function Order() {

  return (
    <MainLayout>
      <OrderModules />
    </MainLayout>
  );
}
