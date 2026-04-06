import { Box, Flex, Text } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const categoryColors = {
  Housing: "#3182CE",
  Food: "#38A169",
  Tech: "#D69E2E",
  Entertainment: "#805AD5",
  Other: "#A0AEC0",
};

const ChartsSection = ({ transactions = [] }) => {
  // ==========================================
  // DYNAMIC MATH (Unchanged)
  // ==========================================
  const expenseMap = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  const dynamicExpenseData = Object.keys(expenseMap).map((category) => ({
    name: category,
    value: expenseMap[category],
  }));

  const finalPieData =
    dynamicExpenseData.length > 0
      ? dynamicExpenseData
      : [{ name: "No Expenses", value: 1 }];

  const dailyNetMap = transactions.reduce((acc, tx) => {
    const amount = tx.type === "income" ? tx.amount : -tx.amount;
    acc[tx.date] = (acc[tx.date] || 0) + amount;
    return acc;
  }, {});

  const sortedDates = Object.keys(dailyNetMap).sort(
    (a, b) => new Date(a) - new Date(b),
  );

  let runningBalance = 15000;

  const dynamicLineData = sortedDates.map((date) => {
    runningBalance += dailyNetMap[date];
    const shortDate = date.split(",")[0];

    return {
      date: shortDate,
      balance: runningBalance,
    };
  });

  const finalLineData =
    dynamicLineData.length > 0
      ? dynamicLineData
      : [{ date: "Today", balance: 0 }];

  // ==========================================
  // RENDER UI
  // ==========================================
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={6}
      w="full"
      maxW="1200px"
      mx="auto"
      mt={6}
    >
      {/* Line Chart Box */}
      <Box
        flex="2"
        minW={0} // <--- MAGIC FIX #1: Stops the flex container from collapsing on mobile
        bg={{ base: "white", _dark: "gray.900" }}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        display="flex"
        flexDirection="column"
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={{ base: "gray.800", _dark: "white" }}
          mb={4}
        >
          Balance Trend (Historical)
        </Text>
        <Box w="full" h={{ base: "250px", md: "300px" }} mt={2}>
          {/* MAGIC FIX #2: width="99%" forces Recharts to draw */}
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={finalLineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
              />
              <XAxis dataKey="date" tick={{ fill: "#718096" }} dy={10} />
              <YAxis
                domain={["auto", "auto"]}
                tickFormatter={(val) => `$${val / 1000}k`}
                tick={{ fill: "#718096" }}
                dx={-10}
                width={45}
              />
              <Tooltip formatter={(value) => [`$${value}`, "Balance"]} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#3182CE"
                strokeWidth={3}
                dot={{ r: 4, fill: "#3182CE" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Donut Chart Box */}
      <Box
        flex="1"
        minW={0}
        bg={{ base: "white", _dark: "gray.900" }}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
        display="flex"
        flexDirection="column"
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={{ base: "gray.800", _dark: "white" }}
          mb={4}
        >
          Current Expenses
        </Text>

        {/* FIX 1: Increased mobile height to 300px so the legend has room to wrap */}
        <Box w="full" h={{ base: "300px", md: "300px" }} mt={2}>
          <ResponsiveContainer width="99%" height="100%">
            <PieChart>
              <Pie
                data={finalPieData}
                innerRadius={55} // FIX 2: Shrunk from 60
                outerRadius={75} // FIX 2: Shrunk from 80
                dataKey="value"
                stroke="none"
              >
                {finalPieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={categoryColors[entry.name] || categoryColors.Other}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Spent"]} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Flex>
  );
};

export default ChartsSection;
