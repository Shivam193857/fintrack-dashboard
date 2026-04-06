import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  HStack,
  Table,
} from "@chakra-ui/react";

// Notice we accept all the props here now
const TransactionsTable = ({
  transactions,
  role,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  addTransaction,
  deleteTransaction,
}) => {
  // Local state just for the Add Modal form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    category: "Housing",
    type: "expense",
    amount: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      description: formData.description,
      category: formData.category,
      type: formData.type,
      amount: parseFloat(formData.amount),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    });

    setFormData({
      description: "",
      category: "Housing",
      type: "expense",
      amount: "",
    });
    setIsModalOpen(false);
  };

  // --- FILTER THE DATA ---
  // This filters the transactions array before we map over it
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || tx.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Box
        bg={{ base: "white", _dark: "gray.900" }}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        w="full"
        maxW="1200px"
        mx="auto"
        mt={6}
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={4}
          color={{ base: "gray.800", _dark: "white" }}
        >
          Transactions
        </Text>

        {/* Toolbar */}
        <Flex
          justify="space-between"
          align="center"
          mb={6}
          flexWrap="wrap"
          gap={4}
        >
          <HStack gap={4} flex="1" minW="300px">
            <Input
              placeholder="Search by merchant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Hooks up search!
              bg={{ base: "gray.50", _dark: "gray.800" }}
              maxW="300px"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)} // Hooks up category filter!
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #E2E8F0",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <option value="All" style={{ color: "black" }}>
                All Categories
              </option>
              <option value="Housing" style={{ color: "black" }}>
                Housing
              </option>
              <option value="Food" style={{ color: "black" }}>
                Food
              </option>
              <option value="Tech" style={{ color: "black" }}>
                Tech
              </option>
              <option value="Income" style={{ color: "black" }}>
                Income
              </option>
            </select>
          </HStack>

          {role === "Admin" && (
            <Button colorPalette="blue" onClick={() => setIsModalOpen(true)}>
              + Add Transaction
            </Button>
          )}
        </Flex>

        {/* Table */}
        <Box overflowX="auto">
          <Table.Root size="md" variant="line">
            <Table.Header bg={{ base: "gray.50", _dark: "gray.800" }}>
              <Table.Row>
                <Table.ColumnHeader color={{ _dark: "gray.300" }}>
                  Date
                </Table.ColumnHeader>
                <Table.ColumnHeader color={{ _dark: "gray.300" }}>
                  Description
                </Table.ColumnHeader>
                <Table.ColumnHeader color={{ _dark: "gray.300" }}>
                  Category
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="right"
                  color={{ _dark: "gray.300" }}
                >
                  Amount
                </Table.ColumnHeader>
                {role === "Admin" && (
                  <Table.ColumnHeader
                    textAlign="center"
                    color={{ _dark: "gray.300" }}
                  >
                    Actions
                  </Table.ColumnHeader>
                )}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* WE MAP OVER FILTERED DATA HERE */}
              {filteredTransactions.map((tx) => (
                <Table.Row key={tx.id}>
                  <Table.Cell color={{ base: "gray.600", _dark: "gray.400" }}>
                    {tx.date}
                  </Table.Cell>
                  <Table.Cell
                    fontWeight="medium"
                    color={{ base: "gray.800", _dark: "gray.100" }}
                  >
                    {tx.description}
                  </Table.Cell>
                  <Table.Cell>
                    <Box
                      display="inline-block"
                      px={2}
                      py={1}
                      bg={{ base: "gray.100", _dark: "gray.700" }}
                      borderRadius="md"
                      fontSize="xs"
                    >
                      {tx.category}
                    </Box>
                  </Table.Cell>
                  <Table.Cell
                    textAlign="right"
                    fontWeight="bold"
                    color={
                      tx.type === "income"
                        ? "green.500"
                        : { base: "gray.800", _dark: "gray.100" }
                    }
                  >
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </Table.Cell>

                  {role === "Admin" && (
                    <Table.Cell textAlign="center">
                      <HStack justify="center" gap={2}>
                        <Button
                          size="xs"
                          colorPalette="red"
                          variant="ghost"
                          onClick={() => deleteTransaction(tx.id)}
                        >
                          Del
                        </Button>
                      </HStack>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <Box
          position="fixed"
          inset={0}
          bg="black/50"
          zIndex={50}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg={{ base: "white", _dark: "gray.800" }}
            p={6}
            borderRadius="lg"
            w="full"
            maxW="md"
            boxShadow="xl"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4}>
              Add New Transaction
            </Text>
            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap={4}>
                <Input
                  placeholder="Description (e.g. Groceries)"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  required
                />

                <select
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                    background: "transparent",
                  }}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Housing" style={{ color: "black" }}>
                    Housing
                  </option>
                  <option value="Food" style={{ color: "black" }}>
                    Food
                  </option>
                  <option value="Tech" style={{ color: "black" }}>
                    Tech
                  </option>
                  <option value="Entertainment" style={{ color: "black" }}>
                    Entertainment
                  </option>
                  <option value="Income" style={{ color: "black" }}>
                    Income
                  </option>
                </select>

                <select
                  style={{
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                    background: "transparent",
                  }}
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="expense" style={{ color: "black" }}>
                    Expense
                  </option>
                  <option value="income" style={{ color: "black" }}>
                    Income
                  </option>
                </select>

                <HStack justify="flex-end" mt={4}>
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button colorPalette="blue" type="submit">
                    Save Transaction
                  </Button>
                </HStack>
              </Flex>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TransactionsTable;
