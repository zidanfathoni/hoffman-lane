'use client';

import { MainLayout } from '@/components/templates';
import HomeModules from '@/modules/home';
import MenuSection from '@/modules/home/menuSection';
import MenuRecommendationSection from '@/modules/home/recommendationSection';

export default function Menu() {

  return (
    <MainLayout>
      <MenuSection />
      <MenuRecommendationSection />
    </MainLayout>
  );
}
