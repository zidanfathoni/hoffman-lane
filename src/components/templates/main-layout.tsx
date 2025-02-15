'use client';

import { useTheme } from 'next-themes';
import Header from '../atoms/navbar';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const MainLayout: React.FC<Props> = (props) => {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen w-screen bg-background">
      <Header />
      <div className='pt-16'>
        {props.children}
      </div>
      {/* <Footer /> */}
    </main>
  );
};

export default MainLayout;
