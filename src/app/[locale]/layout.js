import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Fira_Sans } from 'next/font/google'
import '../globals.css'

const firaSans = Fira_Sans({
  weight: ['400', '500'], 
  style: 'normal', 
  subsets: ['latin'],
})

export const metadata = {
  title: 'Louis XIII',
  description: '',
}

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'fr'}];
}

export default async function RootLayout({ children, params: { locale }}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body 
        className={firaSans.className} 
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
