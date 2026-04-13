import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import * as nextRouter from "next/router";
import KategoriDuplicate from "@/pages/produk/index_Duplicate";
import HalamanProdukDuplicate from "@/pages/produk/[produk]_Duplicate";

const useRouterSpy = jest.spyOn(nextRouter, "useRouter");

describe("Produk duplicate pages", () => {
  beforeEach(() => {
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

    useRouterSpy.mockReturnValue({
      route: "/produk/test",
      pathname: "/produk/[produk]_Duplicate",
      query: { produk: "test" },
      asPath: "/produk/test",
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isReady: true,
    } as unknown as ReturnType<typeof nextRouter.useRouter>);
  });

  it("renders produk detail duplicate route", () => {
    render(<HalamanProdukDuplicate />);
    expect(screen.getByText("Halaman Produk").textContent).toBe(
      "Halaman Produk",
    );
    expect(screen.getByText("Produk : test").textContent).toBe("Produk : test");
  });

  it("fetches and renders duplicate product list", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        data: [
          {
            id: "1",
            name: "Keyboard",
            price: 500000,
            size: "M",
            category: "Aksesoris",
          },
        ],
      }),
    });

    render(<KategoriDuplicate />);

    expect(screen.getByText("Daftar Produk").textContent).toBe("Daftar Produk");

    await waitFor(() => {
      expect(screen.getByText("Keyboard").textContent).toBe("Keyboard");
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/produk");
    expect(screen.getByText("Harga: 500000").textContent).toBe("Harga: 500000");
    expect(screen.getByText("Ukuran: M").textContent).toBe("Ukuran: M");
    expect(screen.getByText("Kategori: Aksesoris").textContent).toBe(
      "Kategori: Aksesoris",
    );
  });
});
