import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HomeInfoBox from "../../../src/pages/home/HomeInfoBox";

test("asd", () => {
  render(<HomeInfoBox />);
});

test("should render correct number of infoboxes", () => {
  const data = [
    { icon: "icon1", heading: "Heading 1", text: "Text 1" },
    { icon: "icon2", heading: "Heading 2", text: "Text 2" },
    { icon: "icon3", heading: "Heading 3", text: "Text 3" },
  ];
  render(<HomeInfoBox data={data} />);

  const infoboxes = screen.getAllByTestId("infobox");
  expect(infoboxes.length).toBe(data.length);
});

test("should render correct heading and text for each infobox", () => {
  const data = [
    { icon: "icon1", heading: "Heading 1", text: "Text 1" },
    { icon: "icon2", heading: "Heading 2", text: "Text 2" },
    { icon: "icon3", heading: "Heading 3", text: "Text 3" },
  ];
  render(<HomeInfoBox data={data} />);

  const infoboxes = screen.getAllByTestId("infobox");
  infoboxes.forEach((infobox, index) => {
    const heading = screen.getByTestId(`heading-${index}`);
    const text = screen.getByTestId(`text-${index}`);

    expect(heading.textContent).toBe(data[index].heading);
    expect(text.textContent).toBe(data[index].text);
  });
});

test("should render HomeInfoBox component with no infoboxes", () => {
  const data = [];
  render(<HomeInfoBox data={data} />);

  const infoboxes = screen.queryAllByTestId("infobox");
  expect(infoboxes.length).toBe(0);
});

test("should render HomeInfoBox component with one infobox", () => {
  const data = [{ icon: "icon1", heading: "Heading 1", text: "Text 1" }];
  render(<HomeInfoBox data={data} />);

  const infoboxes = screen.getAllByTestId("infobox");
  expect(infoboxes.length).toBe(1);

  const heading = screen.getByTestId("heading-0");
  const text = screen.getByTestId("text-0");

  expect(heading.textContent).toBe(data[0].heading);
  expect(text.textContent).toBe(data[0].text);
});
