import { Box, HStack, Text } from "@chakra-ui/react";

const InsightsBanner = () => {
  return (
    <Box
      bg="blue.50"
      p={4}
      borderRadius="lg"
      w="full"
      maxW="1200px"
      mx="auto"
      mt={6}
    >
      <HStack gap={6} flexWrap="wrap">
        <Text color="blue.800" fontSize="sm">
          💡 <b>Top Expense:</b> Housing ($1,200)
        </Text>
        <Text color="blue.800" fontSize="sm">
          📉 <b>Trend:</b> You spent 5% less than last month! Great job.
        </Text>
      </HStack>
    </Box>
  );
};

export default InsightsBanner;
