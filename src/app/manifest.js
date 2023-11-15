export default function manifest() {
  return {
  name: 'LXIII Events Headless Form App',
  short_name: 'Events Form App',
  description: 'LXIII Events Headless Form App',
  start_url: '/',
  display: 'standalone',
  background_color: '#fff',
  theme_color: '#fff',
  icons: [
    {
      src: '/icon.png',
      sizes: '32x32',
      type: 'image/png',
    },
  ],
}
}