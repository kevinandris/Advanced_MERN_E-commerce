import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ListOfOrders from "../../../src/pages/order/ListOfOrders";

test("Displays loader when isLoading is true", () => {
  render(<ListOfOrders isLoading={true} />);
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});

test("Displays 'No order found' when orders array is empty", () => {
  render(<ListOfOrders orders={[]} />);
  expect(screen.getByText("No order found")).toBeInTheDocument();
});

test("Renders the table correctly", () => {
  const orders = [
    {
      _id: "1",
      orderDate: "2022-01-01",
      orderTime: "10:00 AM",
      orderAmount: 100,
      orderStatus: "Delivered",
    },
    {
      _id: "2",
      orderDate: "2022-01-02",
      orderTime: "11:00 AM",
      orderAmount: 200,
      orderStatus: "Pending",
    },
  ];
  render(<ListOfOrders orders={orders} />);

  const tableHeaders = screen.getAllByRole("columnheader");
  expect(tableHeaders).toHaveLength(5);
  expect(tableHeaders[0]).toHaveTextContent("s/n");
  expect(tableHeaders[1]).toHaveTextContent("Date:");
  expect(tableHeaders[2]).toHaveTextContent("Order ID");
  expect(tableHeaders[3]).toHaveTextContent("Order Amount");
  expect(tableHeaders[4]).toHaveTextContent("Order Status");

  const tableRows = screen.getAllByRole("row");
  expect(tableRows).toHaveLength(3);

  const firstRowColumns = within(tableRows[1]).getAllByRole("cell");
  expect(firstRowColumns).toHaveLength(5);
  expect(firstRowColumns[0]).toHaveTextContent("1");
  expect(firstRowColumns[1]).toHaveTextContent("2022-01-01 at 10:00 AM");
  expect(firstRowColumns[2]).toHaveTextContent("1");
  expect(firstRowColumns[3]).toHaveTextContent("$100");
  expect(firstRowColumns[4]).toHaveTextContent("Delivered");

  const secondRowColumns = within(tableRows[2]).getAllByRole("cell");
  expect(secondRowColumns).toHaveLength(5);
  expect(secondRowColumns[0]).toHaveTextContent("2");
  expect(secondRowColumns[1]).toHaveTextContent("2022-01-02 at 11:00 AM");
  expect(secondRowColumns[2]).toHaveTextContent("2");
  expect(secondRowColumns[3]).toHaveTextContent("$200");
  expect(secondRowColumns[4]).toHaveTextContent("Pending");
});

test("Displays 'Pending' status in red for pending orders", () => {
  const orders = [
    {
      _id: "1",
      orderDate: "2022-01-01",
      orderTime: "10:00 AM",
      orderAmount: 100,
      orderStatus: "Delivered",
    },
    {
      _id: "2",
      orderDate: "2022-01-02",
      orderTime: "11:00 AM",
      orderAmount: 200,
      orderStatus: "Pending",
    },
  ];
  render(<ListOfOrders orders={orders} />);

  const pendingStatus = screen.getByText("Pending");
  expect(pendingStatus).toBeInTheDocument();
  expect(pendingStatus).toHaveClass("pending");
});
