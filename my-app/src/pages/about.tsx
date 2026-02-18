import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  return (
    <div>
      <p>Nama : Galung Erlyan Tama</p>
      <p>NIM : 2341720054</p>
      <p>Program Studi : D4 Teknik Informatika</p>
      <Link href="/">Halaman Utama</Link>
    </div>
  )
}
