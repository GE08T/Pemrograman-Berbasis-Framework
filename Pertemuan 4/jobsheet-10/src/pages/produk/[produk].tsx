import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import styles from "./detail.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type ProductResponse = {
  status: boolean;
  statusCode: number;
  data: ProductType[];
};

const HalamanProduk = () => {
  const { query } = useRouter();
  const slug = typeof query.produk === "string" ? query.produk : "";

  const { data, error, isLoading } = useSWR<ProductResponse>(
    "/api/produk",
    fetcher,
  );

  const selectedProduct = data?.data?.find((product) => {
    const nameSlug = product.name.toLowerCase().replace(/\s+/g, "-");
    return product.id === slug || nameSlug === slug;
  });

  if (isLoading || !slug) {
    return (
      <div className={styles.detail}>
        <div className={styles.detail__skeleton}>
          <div className={styles.detail__skeleton__image}></div>
          <div className={styles.detail__skeleton__line}></div>
          <div className={styles.detail__skeleton__lineShort}></div>
          <div className={styles.detail__skeleton__line}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detail}>
        <p className={styles.detail__message}>Gagal memuat data produk.</p>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className={styles.detail}>
        <p className={styles.detail__message}>Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <div className={styles.detail__card}>
        <img
          className={styles.detail__card__image}
          src={selectedProduct.image}
          alt={selectedProduct.name}
        />
        <h1 className={styles.detail__card__title}>{selectedProduct.name}</h1>
        <p className={styles.detail__card__category}>
          {selectedProduct.category}
        </p>
        <p className={styles.detail__card__price}>
          Rp {selectedProduct.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default HalamanProduk;
