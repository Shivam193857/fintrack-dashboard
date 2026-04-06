import { Flex, Box, Text } from "@chakra-ui/react";

// 1. Accept the dynamic props here
const SummaryCards = ({ balance = 0, income = 0, expenses = 0 }) => {
  // Quick helper to format numbers into currency
  const formatMoney = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <Flex
      wrap="wrap"
      gap={4}
      justify="space-between"
      w="full"
      maxW="1200px"
      mx="auto"
      mt={6}
    >
      {/* Total Balance Card */}
      <Box
        flex="1"
        minW="250px"
        bg={{ base: "white", _dark: "gray.900" }}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
      >
        <Text
          color="gray.500"
          fontSize="sm"
          fontWeight="medium"
          textTransform="uppercase"
        >
          Total Balance
        </Text>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color={{ base: "gray.800", _dark: "white" }}
          mt={2}
        >
          {formatMoney(balance)} {/* Dynamic Value! */}
        </Text>
      </Box>

      {/* Total Income Card */}
      <Box
        flex="1"
        minW="250px"
        bg={{ base: "white", _dark: "gray.900" }}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
      >
        <Text
          color="gray.500"
          fontSize="sm"
          fontWeight="medium"
          textTransform="uppercase"
        >
          Total Income
        </Text>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color={{ base: "gray.800", _dark: "white" }}
          mt={2}
        >
          {formatMoney(income)} {/* Dynamic Value! */}
        </Text>
      </Box>

      {/* Total Expenses Card */}
      <Box
        flex="1"
        minW="250px"
        bg={{ base: "white", _dark: "gray.900" }}
        p={6}
        borderRadius="lg"
        boxShadow="sm"
      >
        <Text
          color="gray.500"
          fontSize="sm"
          fontWeight="medium"
          textTransform="uppercase"
        >
          Total Expenses
        </Text>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color={{ base: "gray.800", _dark: "white" }}
          mt={2}
        >
          {formatMoney(expenses)} {/* Dynamic Value! */}
        </Text>
      </Box>
    </Flex>
  );
};

export default SummaryCards;
