import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import HalamanLogin from "@/pages/auth/login";
import HalamanRegister from "@/pages/auth/register";
import ProfilePage from "@/pages/profile";
import HalamanToko from "@/pages/shop/[[...slug]]";
import * as nextRouter from "next/router";
import * as nextAuthReact from "next-auth/react";

const useRouterSpy = jest.spyOn(nextRouter, "useRouter");
const useSessionSpy = jest.spyOn(nextAuthReact, "useSession");

beforeEach(() => {
  useRouterSpy.mockReturnValue({
    route: "/shop",
    pathname: "/shop",
    query: {},
    asPath: "/shop",
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

  useSessionSpy.mockReturnValue({
    data: {
      user: {
        fullname: "Budi",
      },
    },
    status: "authenticated",
    update: jest.fn(),
  } as unknown as ReturnType<typeof nextAuthReact.useSession>);
});

describe("Auth, Profile, and Shop Pages", () => {
  it("renders login page", () => {
    render(<HalamanLogin />);
    expect(screen.getByText("Halaman Login").textContent).toBe("Halaman Login");
  });

  it("renders register page", () => {
    render(<HalamanRegister />);
    expect(screen.getByText("Halaman Register").textContent).toBe(
      "Halaman Register",
    );
  });

  it("renders profile page with session fullname", () => {
    render(<ProfilePage />);
    expect(screen.getByText("Halaman Profile").textContent).toBe(
      "Halaman Profile",
    );
    expect(screen.getByText("Selamat Datang Budi").textContent).toBe(
      "Selamat Datang Budi",
    );
  });

  it("renders shop page default category and redirects when not logged in", () => {
    const pushMock = jest.fn();
    useRouterSpy.mockReturnValue({
      route: "/shop",
      pathname: "/shop",
      query: {},
      asPath: "/shop",
      push: pushMock,
      replace: jest.fn(),
      prefetch: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isReady: true,
    } as unknown as ReturnType<typeof nextRouter.useRouter>);

    render(<HalamanToko />);
    expect(screen.getByText("Halaman Toko").textContent).toBe("Halaman Toko");
    expect(screen.getByText("Kategori: Semua Kategori").textContent).toBe(
      "Kategori: Semua Kategori",
    );
    expect(pushMock).toHaveBeenCalledWith("/auth/login");
  });

  it("renders shop page category from slug", () => {
    useRouterSpy.mockReturnValue({
      route: "/shop/elektronik",
      pathname: "/shop/[[...slug]]",
      query: { slug: ["elektronik", "laptop"] },
      asPath: "/shop/elektronik/laptop",
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

    render(<HalamanToko />);
    expect(screen.getByText("Kategori: elektronik").textContent).toBe(
      "Kategori: elektronik",
    );
  });
});
