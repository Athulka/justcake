import './globals.css'

export const metadata = {
  title: 'Just Cake & Cookie — Taste the love in every crumb',
  description: 'Handcrafted cakes, cookies & pastries. Made with love, served with soul.',
  icons: {
    icon: '/logo.jpg',
  },
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=Italianno&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}