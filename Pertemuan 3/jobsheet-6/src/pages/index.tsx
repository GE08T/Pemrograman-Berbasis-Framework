import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>CUSTOM DOCUMENT DAN CUSTOM ERROR PAGE PADA NEXT.JS</h1>
      <p>Mahasiswa D4 Pemrograman Berbasis Framework</p>
    </div>
  )
}
