import { Box, Card, Input, Button, Stack, Spinner } from "@chakra-ui/react";
import { Field } from "../ui/field";
import useAuthStore from "../../store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      h={"100dvh"}
      w={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card.Root w={"60%"}>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          <Card.Description>Log In With Your Credentials</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field label="Username">
              <Input
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          {isLoading ? (
            <Button disabled>
              <Spinner mr={2} />
              Logging In..
            </Button>
          ) : (
            <Button onClick={handleLogin} variant="solid">
              Sign in
            </Button>
          )}
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};

export default LoginForm;
