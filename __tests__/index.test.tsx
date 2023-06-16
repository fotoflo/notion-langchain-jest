import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByTestId("H1", {
      text: "Chat With Alex&apos;s Notion",
    });

    expect(heading).toBeInTheDocument();
  });
});
