import dynamic from "next/dynamic";
import { ProductType } from "../../types/Product.type";

const DetailProduk = dynamic(() => import("../../views/DetailProduct"), {
  loading: () => <p>Loading product detail...</p>,
});

const HalamanProduk = ({ product }: { product: ProductType }) => {
  // {/digunakan client-side rendering/}
  // // const Router = useRouter(); ...

  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProduk;

// {/digunakan server-side rendering/}
// // export async function getServerSideProps({ params }: { params: { produk: string } }) {
// //   const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
// //   const respone = await res.json();
// //   // console.log("Data produk yang diambil dari API:", respone);
// //   return {
// //     props: {
// //       product: respone.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
// //     },
// //   };
// // }

// {/digunakan static-site generation/}
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/products");
  const response = await res.json();

  const paths = response.data.map((product: ProductType) => ({
    params: { produk: product.id },
  }));
  // console.log("Paths yang dihasilkan untuk produk:", paths); // Debugging: Tampilkan paths yang dihasilkan
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { produk: string };
}) {
  const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
  // const response: ProductType[] = await res.json();
  const response: { data: ProductType } = await res.json();

  // console.log("Data produk yang diambil dari API:", response);
  return {
    props: {
      product: response.data,
    },
  };
}
