import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import HomePage from "@/pages";
import HalamanAdmin from "@/pages/admin";
import HalamanEditor from "@/pages/editor";
import AppSetting from "@/pages/setting/app";
import UserSettingPage from "@/pages/user";
import UserPasswordPage from "@/pages/user/password";

describe("Basic Pages", () => {
  it("renders admin page content", () => {
    render(<HalamanAdmin />);
    expect(screen.getByText("Halaman Admin").textContent).toBe("Halaman Admin");
  });

  it("renders editor page content", () => {
    render(<HalamanEditor />);
    expect(screen.getByText("Halaman Editor").textContent).toBe(
      "Halaman Editor",
    );
  });

  it("renders app setting page content", () => {
    render(<AppSetting />);
    expect(screen.getByText("App Setting Page").textContent).toBe(
      "App Setting Page",
    );
  });

  it("renders user setting page content", () => {
    render(<UserSettingPage />);
    expect(screen.getByText("User Setting Page").textContent).toBe(
      "User Setting Page",
    );
  });

  it("renders user password page content", () => {
    render(<UserPasswordPage />);
    expect(screen.getByText("Password User Page").textContent).toBe(
      "Password User Page",
    );
  });
});
