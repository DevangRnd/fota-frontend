import {
  Box,
  Input,
  Button,
  Stack,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const LoginForm = () => {
  const { isLoading, login } = useAuthStore();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      navigate("/"); // Redirect to the desired route, e.g., '/dashboard'
    }
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      position="relative"
      bgGradient="linear(to-r, blue.600, purple.600, pink.600)"
      bgSize="cover"
      bgPosition="center"
      _before={{
        content: `""`,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay
        zIndex: 0,
      }}
    >
      <Box
        width="100%"
        maxWidth="400px"
        bg={{ base: "white", _dark: "gray.800" }}
        p="6"
        rounded="lg"
        shadow="lg"
        border="1px"
        borderColor={{ base: "gray.200", _dark: "gray.700" }}
        zIndex={1}
      >
        <Stack spacing={4}>
          <Heading
            size="lg"
            textAlign="center"
            color={{ base: "gray.800", _dark: "white" }}
          >
            Sign In
          </Heading>
          <Text
            textAlign="center"
            color={{ base: "gray.600", _dark: "gray.400" }}
          >
            Log In with Your Credentials
          </Text>
          <Box>
            <Text
              mb="1"
              fontSize="sm"
              color={{ base: "gray.600", _dark: "gray.400" }}
            >
              Username
            </Text>
            <Input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              variant="outline"
              placeholder="Enter your username"
              focusBorderColor="purple.500"
              _dark={{
                bg: "gray.700",
                borderColor: "gray.600",
                color: "white",
              }}
            />
          </Box>
          <Box>
            <Text
              mb="1"
              fontSize="sm"
              color={{ base: "gray.600", _dark: "gray.400" }}
            >
              Password
            </Text>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outline"
              placeholder="Enter your password"
              focusBorderColor="purple.500"
              _dark={{
                bg: "gray.700",
                borderColor: "gray.600",
                color: "white",
              }}
            />
          </Box>
          <Flex justifyContent="center" mt="4">
            {isLoading ? (
              <Button
                disabled
                colorScheme="purple"
                variant="solid"
                width="full"
                isLoading
              >
                Logging In...
              </Button>
            ) : (
              <Button
                onClick={handleLogin}
                colorScheme="purple"
                variant="solid"
                width="full"
              >
                Sign In
              </Button>
            )}
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginForm;
