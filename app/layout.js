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
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}