import Head from "next/head";
import styles from "@/styles/404.module.scss";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
        <meta
          name="description"
          content="Halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan."
        />
      </Head>

      <main className={`${styles.error} ${poppins.className}`}>
        <section className={styles.error__card}>
          <div className={styles.error__media}>
            <img
              src="/page-not-found.png"
              alt="Ilustrasi halaman tidak ditemukan"
              className={styles.error__image}
            />
          </div>

          <div className={styles.error__content}>
            <h1 className={styles.error__title}>
              404 - Halaman Tidak Ditemukan
            </h1>
            <p className={styles.error__description}>
              Maaf, halaman yang Anda cari tidak tersedia atau mungkin sudah
              dipindahkan.
            </p>
            <Link href="/" className={styles.error__link}>
              Kembali ke Beranda
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Custom404;
