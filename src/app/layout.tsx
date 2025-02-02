import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProgressBarProvider, ReduxProvider, ThemeProvider } from '@/components/molecules';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from '@/components/atoms/toaster';

// fonts
export const metadata: Metadata = {
  title: {
    template: '%s | by Hoffmann Lane',
    default: 'Hoffmann Lane',
  },
  description: 'A web by Hoffmann Lane',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html className={` scroll-smooth dark`}>
      <head>
        <link rel="icon" href="/images/logo.svg" sizes="any" />
      </head>
      <body className="overflow-x-hidden font-inter">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              <AppProgressBarProvider>
                {children}
                <Toaster />
              </AppProgressBarProvider>
            </ReduxProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
