import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OpenAccount from "../landing_page/OpenAccount";

describe("OpenAccount Component", () => {
  test("renders the main heading successfully", () => {
    render(<OpenAccount />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Open a Zerodha account");
  });

  test("renders the description paragraph successfully", () => {
    render(<OpenAccount />);
    const description = screen.getByText(/Modern platforms and apps/i);
    expect(description).toBeInTheDocument();
  });

  test("renders the signup button successfully", () => {
    render(<OpenAccount />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Signup Now/i);
  });
});
