import { fireEvent, render, screen } from "@testing-library/react";
import SignUpDialog from "../src/app/auth/SignUpDialog";

describe("SignUpDialog", () => {
  it("renders sign up button", () => {
    render(<SignUpDialog />);
    const signUpText = screen.getByText(/Don't have an account\?/i);
    expect(signUpText).toBeInTheDocument();
    const signUpButton = screen.getByText(/Sign Up/i);
    expect(signUpButton).toBeInTheDocument();
  });
});
