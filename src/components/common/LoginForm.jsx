import {
  Box,
  Input,
  Button,
  Stack,
  Spinner,
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
    <Box
      h="100vh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      // background={"lightblue"}
      bgGradient={"to-r"}
      gradientFrom={"blue.300"}
      gradientVia={"purple.100"}
      gradientTo={"pink.300"}
      position="relative"
      overflow="hidden"
    >
      <Box w="sm" bg="lightsalmon" p="8" rounded="lg" shadow="lg" zIndex="1">
        <Stack spacing={4} align="center" mb="4">
          <Heading size="2xl" color="whiteAlpha.950">
            Sign in
          </Heading>
          <Text color="gray.500">Log In With Your Credentials</Text>
        </Stack>

        <Stack spacing={4}>
          <Box>
            <Text mb="1" fontSize="sm" color="gray.600">
              Username
            </Text>
            <Input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              variant="filled"
            />
          </Box>

          <Box>
            <Text mb="1" fontSize="sm" color="gray.600">
              Password
            </Text>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="filled"
            />
          </Box>
        </Stack>

        <Flex mt="6" justifyContent="flex-end">
          {isLoading ? (
            <Button disabled colorScheme="purple" variant="solid">
              <Spinner mr={2} />
              Logging In..
            </Button>
          ) : (
            <Button onClick={handleLogin} colorScheme="purple" variant="solid">
              Sign in
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default LoginForm;
