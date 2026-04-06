import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const halamanToko = () => {
  // const router = useRouter();
  // console.log(router);
  const { query } = useRouter();
  const slug = query.slug;
  
  const [isLogin, setIsLogin] = useState(false);
    const { push } = useRouter();
    useEffect(() => {
      if(!isLogin) {
        push('/auth/login');
      }
    }, []);

  return (
    <div>
      <h1>Halaman Toko</h1>
      {/* <p>Toko : {`${query.slug && query.slug[0] + "-" + query.slug[1]}`}</p> */}
      {/* <p>Toko : {Array.isArray(query.slug) ? query.slug.join("-") : query.slug}</p> */}
      <p>Kategori: {slug ? slug[0] : "Semua Kategori"}</p>
    </div>
  );
};

export default halamanToko;