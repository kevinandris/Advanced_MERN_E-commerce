import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import WalletTransactions from "../../../src/pages/wallet/WalletTransactions";

test("Renders correct number of transactions", () => {
  const transactions = [
    {
      _id: 1,
      createdAt: "2021-01-01",
      amount: 100,
      sender: "user1",
      receiver: "user2",
      description: "Transaction 1",
      status: "Completed",
    },
    {
      _id: 2,
      createdAt: "2021-01-02",
      amount: 200,
      sender: "user2",
      receiver: "user1",
      description: "Transaction 2",
      status: "Pending",
    },
    {
      _id: 3,
      createdAt: "2021-01-03",
      amount: 300,
      sender: "user1",
      receiver: "user3",
      description: "Transaction 3",
      status: "Completed",
    },
  ];
  const user = { email: "user1" };
  render(<WalletTransactions transactions={transactions} user={user} />);

  const transactionRows = screen.getAllByRole("row");
  expect(transactionRows.length).toBe(4); // Including table header row
});

test("Renders correct status for each transaction", () => {
  const transactions = [
    {
      _id: 1,
      createdAt: "2021-01-01",
      amount: 100,
      sender: "user1",
      receiver: "user2",
      description: "Transaction 1",
      status: "Completed",
    },
    {
      _id: 2,
      createdAt: "2021-01-02",
      amount: 200,
      sender: "user2",
      receiver: "user1",
      description: "Transaction 2",
      status: "Pending",
    },
    {
      _id: 3,
      createdAt: "2021-01-03",
      amount: 300,
      sender: "user1",
      receiver: "user3",
      description: "Transaction 3",
      status: "Completed",
    },
  ];
  const user = { email: "user1" };
  render(<WalletTransactions transactions={transactions} user={user} />);

  const transactionStatusCells = screen.getAllByRole("cell", {
    name: /status/i,
  });
  expect(transactionStatusCells[0]).toHaveTextContent("Completed");
  expect(transactionStatusCells[1]).toHaveTextContent("Pending");
  expect(transactionStatusCells[2]).toHaveTextContent("Completed");
});

test("Renders correct transactions for each page", () => {
  const transactions = [
    {
      _id: 1,
      createdAt: "2021-01-01",
      amount: 100,
      sender: "user1",
      receiver: "user2",
      description: "Transaction 1",
      status: "Completed",
    },
    {
      _id: 2,
      createdAt: "2021-01-02",
      amount: 200,
      sender: "user2",
      receiver: "user1",
      description: "Transaction 2",
      status: "Pending",
    },
    {
      _id: 3,
      createdAt: "2021-01-03",
      amount: 300,
      sender: "user1",
      receiver: "user3",
      description: "Transaction 3",
      status: "Completed",
    },
    {
      _id: 4,
      createdAt: "2021-01-04",
      amount: 400,
      sender: "user3",
      receiver: "user1",
      description: "Transaction 4",
      status: "Pending",
    },
    {
      _id: 5,
      createdAt: "2021-01-05",
      amount: 500,
      sender: "user1",
      receiver: "user4",
      description: "Transaction 5",
      status: "Completed",
    },
    {
      _id: 6,
      createdAt: "2021-01-06",
      amount: 600,
      sender: "user4",
      receiver: "user1",
      description: "Transaction 6",
      status: "Pending",
    },
    {
      _id: 7,
      createdAt: "2021-01-07",
      amount: 700,
      sender: "user1",
      receiver: "user5",
      description: "Transaction 7",
      status: "Completed",
    },
    {
      _id: 8,
      createdAt: "2021-01-08",
      amount: 800,
      sender: "user5",
      receiver: "user1",
      description: "Transaction 8",
      status: "Pending",
    },
    {
      _id: 9,
      createdAt: "2021-01-09",
      amount: 900,
      sender: "user1",
      receiver: "user6",
      description: "Transaction 9",
      status: "Completed",
    },
    {
      _id: 10,
      createdAt: "2021-01-10",
      amount: 1000,
      sender: "user6",
      receiver: "user1",
      description: "Transaction 10",
      status: "Pending",
    },
    {
      _id: 11,
      createdAt: "2021-01-11",
      amount: 1100,
      sender: "user1",
      receiver: "user7",
      description: "Transaction 11",
      status: "Completed",
    },
    {
      _id: 12,
      createdAt: "2021-01-12",
      amount: 1200,
      sender: "user7",
      receiver: "user1",
      description: "Transaction 12",
      status: "Pending",
    },
    {
      _id: 13,
      createdAt: "2021-01-13",
      amount: 1300,
      sender: "user1",
      receiver: "user8",
      description: "Transaction 13",
      status: "Completed",
    },
    {
      _id: 14,
      createdAt: "2021-01-14",
      amount: 1400,
      sender: "user8",
      receiver: "user1",
      description: "Transaction 14",
      status: "Pending",
    },
    {
      _id: 15,
      createdAt: "2021-01-15",
      amount: 1500,
      sender: "user1",
      receiver: "user9",
      description: "Transaction 15",
      status: "Completed",
    },
    {
      _id: 16,
      createdAt: "2021-01-16",
      amount: 1600,
      sender: "user9",
      receiver: "user1",
      description: "Transaction 16",
      status: "Pending",
    },
    {
      _id: 17,
      createdAt: "2021-01-17",
      amount: 1700,
      sender: "user1",
      receiver: "user10",
      description: "Transaction 17",
      status: "Completed",
    },
    {
      _id: 18,
      createdAt: "2021-01-18",
      amount: 1800,
      sender: "user10",
      receiver: "user1",
      description: "Transaction 18",
      status: "Pending",
    },
    {
      _id: 19,
      createdAt: "2021-01-19",
      amount: 1900,
      sender: "user1",
      receiver: "user11",
      description: "Transaction 19",
      status: "Completed",
    },
    {
      _id: 20,
      createdAt: "2021-01-20",
      amount: 2000,
      sender: "user11",
      receiver: "user1",
      description: "Transaction 20",
      status: "Pending",
    },
  ];
  const user = { email: "user1" };
  render(<WalletTransactions transactions={transactions} user={user} />);

  const transactionRows = screen.getAllByRole("row");
  expect(transactionRows.length).toBe(11); // Including table header row

  fireEvent.click(screen.getByText("next"));
  expect(transactionRows.length).toBe(11); // Including table header row

  fireEvent.click(screen.getByText("next"));
  expect(transactionRows.length).toBe(1); // Including table header row

  fireEvent.click(screen.getByText("prev"));
  expect(transactionRows.length).toBe(11); // Including table header row
});
