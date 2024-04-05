import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FooterLinks from "../../../src/components/footer/FooterLinks";

test("renders correct social media icons", () => {
  render(<FooterLinks />);
  expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
  expect(screen.getByTestId("twitter-icon")).toBeInTheDocument();
  expect(screen.getByTestId("instagram-icon")).toBeInTheDocument();
  expect(screen.getByTestId("youtube-icon")).toBeInTheDocument();
});

test("renders correct footer links", () => {
  render(<FooterLinks />);
  expect(screen.getByText("Link Shortening")).toBeInTheDocument();
  expect(screen.getByText("Branded Links")).toBeInTheDocument();
  expect(screen.getByText("Analytics")).toBeInTheDocument();
  expect(screen.getByText("Blog")).toBeInTheDocument();
});

test("Enquiry button should have correct link", () => {
  render(<FooterLinks />);
  const enquiryButton = screen.getByText("Make an enquiry!");
  expect(enquiryButton).toBeInTheDocument();
  expect(enquiryButton.getAttribute("href")).toBe("#home");
});

test("Footer menus should have correct heading names", () => {
  render(<FooterLinks />);
  const featureMenu = screen.getByText("Features");
  const resourcesMenu = screen.getByText("Resources");
  const companyMenu = screen.getByText("Company");
  const partnersMenu = screen.getByText("Partners");

  expect(featureMenu).toBeInTheDocument();
  expect(resourcesMenu).toBeInTheDocument();
  expect(companyMenu).toBeInTheDocument();
  expect(partnersMenu).toBeInTheDocument();
});
