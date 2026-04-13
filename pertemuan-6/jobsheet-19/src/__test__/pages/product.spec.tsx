import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import * as nextRouter from "next/router";
import TampilanProduk from "@/pages/produk";

const useRouterSpy = jest.spyOn(nextRouter, "useRouter");

beforeEach(() => {
  useRouterSpy.mockReturnValue({
    route: "/produk",
    pathname: "/produk",
    query: {},
    asPath: "/produk",
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

afterEach(() => {
  jest.clearAllMocks();
});

describe("Product Page", () => {
  it("renders product page correctly", () => {
    const page = render(<TampilanProduk />);
    // expect(screen.getByTestId("title").textContent).toBe("Product Page");
    expect(page).toMatchSnapshot();
  });
});
