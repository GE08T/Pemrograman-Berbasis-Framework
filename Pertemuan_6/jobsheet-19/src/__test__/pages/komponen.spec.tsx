import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";
import TampilanProduk from "@/views/produk";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} alt={props.alt ?? ""} />
  ),
}));

describe("Komponen TampilanProduk", () => {
  it("menampilkan data produk pada halaman produk", () => {
    const products = [
      {
        id: "1",
        name: "Laptop Gaming",
        price: 15000000,
        image: "/images/products/product-1.jpg",
        category: "Elektronik",
      },
    ];

    render(<TampilanProduk products={products} />);

    expect(screen.getByText("Daftar Produk").textContent).toBe("Daftar Produk");
    expect(screen.getByText("Laptop Gaming").textContent).toBe("Laptop Gaming");
    expect(screen.getByText("Elektronik").textContent).toBe("Elektronik");
    expect(screen.getByText("Rp 15.000.000").textContent).toBe("Rp 15.000.000");
    expect(screen.getByRole("link").getAttribute("href")).toBe("/produk/1");
  });
});
