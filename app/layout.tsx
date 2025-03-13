import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Assure-toi que le chemin d'accès est correct
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { RedirectProvider } from '@/context/RedirectContext'
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LUXE - Boutique en ligne',
  description: 'Découvrez notre collection de vêtements de luxe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" {...mantineHtmlProps}>
      <head>
      <meta charSet="UTF-8"/>
        <ColorSchemeScript />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={inter?.className || ''}>
        
          <CartProvider>
            <FavoritesProvider>
              <RedirectProvider>
                <div className="min-h-screen flex flex-col">
                  <MantineProvider>
                  <main className="flex-grow">
                    {children}
                  </main>
                  </MantineProvider>
                </div>
              </RedirectProvider>
            </FavoritesProvider>
          </CartProvider>
        
      </body>
    </html>
  )
}
