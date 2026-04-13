import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import HalamanProdukServer, { getServerSideProps } from "@/pages/produk/server";
import HalamanProdukStatic, {
  getStaticProps as getProdukStaticProps,
} from "@/pages/produk/static";
import HalamanProduk, {
  getStaticPaths,
  getStaticProps as getDetailStaticProps,
} from "@/pages/produk/[produk]";

describe("Produk data pages", () => {
  beforeEach(() => {
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  it("renders produk server page", () => {
    render(
      <HalamanProdukServer
        products={[
          {
            id: "1",
            name: "Laptop",
            price: 1000,
            image: "a",
            category: "Elek",
          },
        ]}
      />,
    );

    expect(screen.getByText("Halaman Produk Server").textContent).toBe(
      "Halaman Produk Server",
    );
    expect(screen.getByText("Daftar Produk").textContent).toBe("Daftar Produk");
    expect(screen.getByText("Laptop").textContent).toBe("Laptop");
  });

  it("returns server side props", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        data: [{ id: "1", name: "Laptop" }],
      }),
    });

    const result = await getServerSideProps();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/produk",
    );
    expect(result).toEqual({
      props: {
        products: [{ id: "1", name: "Laptop" }],
      },
    });
  });

  it("renders produk static page", () => {
    render(
      <HalamanProdukStatic
        products={[
          { id: "1", name: "Phone", price: 1000, image: "a", category: "Elek" },
        ]}
      />,
    );

    expect(screen.getByText("Halaman Produk Static").textContent).toBe(
      "Halaman Produk Static",
    );
    expect(screen.getByText("Daftar Produk").textContent).toBe("Daftar Produk");
    expect(screen.getByText("Phone").textContent).toBe("Phone");
  });

  it("returns static props for produk static page", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        data: [{ id: "1", name: "Phone" }],
      }),
    });

    const result = await getProdukStaticProps();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:3000/api/produk",
    );
    expect(result).toEqual({
      props: {
        products: [{ id: "1", name: "Phone" }],
      },
      revalidate: 10,
    });
  });

  it("renders detail produk page", async () => {
    render(
      <HalamanProduk
        product={{
          id: "1",
          name: "Mouse",
          price: 200,
          image: "a",
          category: "Aksesoris",
        }}
      />,
    );

    expect((await screen.findByText("Detail Produk")).textContent).toBe(
      "Detail Produk",
    );
    expect(screen.getByText("Mouse").textContent).toBe("Mouse");
  });

  it("returns static paths for detail produk", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        data: [{ id: "1" }, { id: "2" }],
      }),
    });

    const result = await getStaticPaths();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/products",
    );
    expect(result).toEqual({
      paths: [{ params: { produk: "1" } }, { params: { produk: "2" } }],
      fallback: false,
    });
  });

  it("returns static props for detail produk", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        data: { id: "1", name: "Mouse" },
      }),
    });

    const result = await getDetailStaticProps({
      params: { produk: "1" },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/produk/1",
    );
    expect(result).toEqual({
      props: {
        product: { id: "1", name: "Mouse" },
      },
    });
  });
});
