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
      bgGradient="linear(to-br, blue.300, purple.500, pink.400)"
      position="relative"
      overflow="hidden"
      _before={{
        content: `""`,
        position: "absolute",
        top: "-50%",
        right: "-50%",
        bottom: "-50%",
        left: "-50%",
        bgGradient: "radial(blue.400, purple.500, pink.300)",
        filter: "blur(200px)",
        opacity: 0.4,
        animation: "moveBackground 20s linear infinite",
      }}
    >
      <Box w="sm" bg="whiteAlpha.900" p="8" rounded="lg" shadow="lg" zIndex="1">
        <Stack spacing={4} align="center" mb="4">
          <Heading size="md" color="gray.700">
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
              focusRing="purple.500"
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
              focusBorderColor="purple.500"
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

      <style>
        {`
          @keyframes moveBackground {
            0% { transform: translate(0, 0); }
            50% { transform: translate(50px, 50px); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>
    </Box>
  );
};

export default LoginForm;
