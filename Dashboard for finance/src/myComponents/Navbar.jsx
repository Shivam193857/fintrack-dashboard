import { Flex, HStack, Heading, Text, Button } from "@chakra-ui/react";
import { useColorMode } from '../components/ui/color-mode'; 

const Navbar = ({ role, setRole }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      bg={{ base: "white", _dark: "gray.900" }} // Fix: Responsive background
      p={4}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Heading size="md" color="blue.600">
        FinTrack
      </Heading>

      <HStack gap={3}>
        {/* --- ADD THIS BUTTON --- */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleColorMode}
          fontSize="lg"
          px={2}
        >
          {colorMode === 'light' ? '🌙' : '☀️'}
        </Button>
        {/* ----------------------- */}
        <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.300" }} fontWeight="medium">
          Viewing as:
        </Text>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            border: "1px solid #E2E8F0",
            backgroundColor: "#F7FAFC",
            color: '#1A202C',
            cursor: "pointer"
          }}
        >
          <option value="Viewer">Viewer</option>
          <option value="Admin">Admin</option>
        </select>
      </HStack>
    </Flex>
  );
};

export default Navbar;