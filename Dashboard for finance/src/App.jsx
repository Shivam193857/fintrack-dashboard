import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./myComponents/Navbar";
import SummaryCards from "./myComponents/SummaryCards";
import InsightsBanner from "./myComponents/InsightsBanner";
import ChartsSection from "./myComponents/ChartsSection";
import TransactionsTable from "./myComponents/TransactionsTable";

// 1. Initial Mock Data moved here
const initialData = [
  {
    id: 1,
    date: "Mar 31, 2026",
    description: "Salary",
    category: "Income",
    amount: 5200.0,
    type: "income",
  },
  {
    id: 2,
    date: "Mar 30, 2026",
    description: "Rent Payment",
    category: "Housing",
    amount: 1200.0,
    type: "expense",
  },
  {
    id: 3,
    date: "Mar 29, 2026",
    description: "Supermarket",
    category: "Food",
    amount: 185.5,
    type: "expense",
  },
  {
    id: 4,
    date: "Mar 28, 2026",
    description: "Netflix",
    category: "Entertainment",
    amount: 15.99,
    type: "expense",
  },
  {
    id: 5,
    date: "Mar 26, 2026",
    description: "Amazon",
    category: "Tech",
    amount: 240.0,
    type: "expense",
  },
];

function App() {
  // --- THE 4 STATES ---
  const [transactions, setTransactions] = useState(initialData);
  const [role, setRole] = useState("Viewer");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // --- ACTIONS ---
  const addTransaction = (newTx) => {
    // Adds the new transaction to the top of the array with a unique ID
    setTransactions([{ ...newTx, id: Date.now() }, ...transactions]);
  };

  const deleteTransaction = (id) => {
    // Filters out the transaction with the matching ID
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  // --- DERIVED DATA (Calculated instantly on every render) ---
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalBalance = 20000 + totalIncome - totalExpenses; // Base 20k for realism

  return (
    <Box bg={{ base: "gray.50", _dark: "black" }} minH="100vh">
      {/* Pass role to Navbar */}
      <Navbar role={role} setRole={setRole} />

      <Box p={6}>
        {/* Pass our calculated math down to the cards */}
        <SummaryCards
          balance={totalBalance}
          income={totalIncome}
          expenses={totalExpenses}
        />

        {/* We will wire up the charts later, leave it empty for now */}
        <ChartsSection transactions={transactions} />

        <InsightsBanner />

        {/* Pass the data, role, and functions to the table */}
        <TransactionsTable
          transactions={transactions}
          role={role}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          addTransaction={addTransaction}
          deleteTransaction={deleteTransaction}
        />
      </Box>
    </Box>
  );
}

export default App;
