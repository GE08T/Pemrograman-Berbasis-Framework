import Link from "next/link";
import styles from "./register.module.css";

const TampilanRegister = () => {
  return (
    <div className={styles.register}>
      <h1>Halaman Register</h1>
      <button>Register</button>
      <h1 className={styles.text}>sudah punya akun</h1>
      <Link href="/auth/login">Ke Halaman Login</Link>
    </div>
  );
};

export default TampilanRegister;