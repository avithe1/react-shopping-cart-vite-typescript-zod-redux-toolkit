import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestComponent from "./TestComponent";

test("renders TestComponent text to be in component", () => {
  render(<TestComponent />);
  const textElement = screen.getByText(/TestComponent/i);
  expect(textElement).toBeInTheDocument();
  screen.debug(); // prints out the jsx in the App component unto the command line
});
