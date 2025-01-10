import { render, screen } from "@testing-library/react";
import Home from "pages/Home";
// import Home from "../pages/Home";

describe("Home Component", () => {
  test("renders the home page correctly", () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to the Home Page/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This is a simple Home component/i)
    ).toBeInTheDocument();
  });
});
