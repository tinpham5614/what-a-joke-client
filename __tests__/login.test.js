import Login from "../src/app/auth/login/Login";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Login", () => {
  it("renders a login form", () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Login" });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
