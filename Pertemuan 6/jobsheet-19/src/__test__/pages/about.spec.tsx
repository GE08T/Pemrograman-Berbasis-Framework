import { render } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import AboutPage from "../../pages/about";

describe("About Page", () => {
  it("should render the about page correctly", () => {
    const page = render(<AboutPage />);
    expect(page).toMatchSnapshot();
  });
});