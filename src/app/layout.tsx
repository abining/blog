import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import Header from '@/components/app/Header'
import Container from '@/components/app/Container'
import { title } from '~/config.json'
import Footer from '@/components/app/Footer'
import HeaderMenu from '@/components/app/Header/Menu'
import Nav from '@/components/app/Nav'
import HeaderBanner from '@/components/app/Header/Banner'
import Main from '@/components/app/Container/Main'
import RightCard from '@/components/app/SideCard'

export const metadata: Metadata = {
  title,
  description: 'Welcome to my blog!',
}

export const viewport: Viewport = {
  themeColor: '#1976d2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 6,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" theme="light">
      <link
        rel="icon"
        type="image/x-icon"
        sizes="32x32"
        href="/icons/favico-32x32.webp"
      />
      <body>
        <div className="Header-Menu">
          <HeaderMenu />
        </div>
        <HeaderBanner />
        <Header />
        <Container>
          <Nav />
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  )
}
