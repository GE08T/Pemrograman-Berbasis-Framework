import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Catch-All Routing, Optional Catch-All, Linking & Navigating pada Next.js Pages Router</h1>
      <p>Mahasiswa D4 Pemrograman Berbasis Framework</p>
    </div>
  )
}
