import Head from 'next/head';
import styles from '@/styles/404.module.scss';

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

      <div className={styles.error}>
        <img
          src="/page-not-found.png"
          alt="Ilustrasi halaman tidak ditemukan"
          className={styles.error__image}
        />
        <h1>404 - Halaman Tidak Ditemukan</h1>
        <p>
          Maaf, halaman yang Anda cari tidak tersedia atau mungkin sudah dipindahkan.
        </p>
      </div>
    </>
  );
};


export default Custom404;