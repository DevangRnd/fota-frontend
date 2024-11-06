import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Menu } from "lucide-react";
import { ColorModeButton } from "../ui/color-mode";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";
const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const handleLogOut = () => {
    logout();
    navigate("/login");
    toaster.create({
      title: "Logged Out",
      duration: 3000,
    });
  };
  return (
    <>
      <Box as="header" position="sticky" w="100%" bg="blue.500">
        <Flex
          width="80%"
          mx="auto"
          justifyContent="space-between"
          alignItems="center"
          py={2}
        >
          <Text fontSize="xl" fontWeight="bold">
            IoT FOTA
          </Text>
          <DrawerRoot>
            <DrawerBackdrop />
            <DrawerTrigger asChild hideFrom={"lg"}>
              <Button variant="outline" size="sm">
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <Flex direction={"column"} justifyContent={"center"} gap={4}>
                  <NavLink
                    to="/"
                    style={({ isActive }) => ({
                      padding: "8px 12px",
                      borderRadius: "4px",
                      background: isActive ? "white" : "transparent",
                      color: isActive ? "black" : "white",
                    })}
                  >
                    All Devices
                  </NavLink>
                  <NavLink
                    to="/firmware-upload"
                    style={({ isActive }) => ({
                      padding: "8px 12px",
                      borderRadius: "4px",
                      background: isActive ? "white" : "transparent",
                      color: isActive ? "black" : "white",
                    })}
                  >
                    Firmware Upload
                  </NavLink>
                  <NavLink
                    to="/upload-devices"
                    style={({ isActive }) => ({
                      padding: "8px 12px",
                      borderRadius: "4px",
                      background: isActive ? "white" : "transparent",
                      color: isActive ? "black" : "white",
                    })}
                  >
                    Upload Devices
                  </NavLink>
                  <ColorModeButton />
                </Flex>
              </DrawerBody>

              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>
          <Flex
            hideBelow={"lg"}
            gap={5}
            justifyContent="center"
            alignItems="center"
          >
            <NavLink
              to="/"
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "white",
                      color: "black",
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }
                  : { color: "white" }
              }
            >
              All Devices
            </NavLink>
            <NavLink
              to="/firmware-upload"
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "white",
                      color: "black",
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }
                  : { color: "white" }
              }
            >
              Firmware Upload
            </NavLink>
            <NavLink
              to="/upload-devices"
              style={({ isActive }) =>
                isActive
                  ? {
                      background: "white",
                      color: "black",
                      padding: "8px 12px",
                      borderRadius: "4px",
                    }
                  : { color: "white" }
              }
            >
              Upload Devices
            </NavLink>
            <DialogRoot>
              <DialogTrigger asChild>
                <Button variant={"outline"}>LogOut</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Do You Want To LogOut?</DialogTitle>
                </DialogHeader>
                {/* <DialogBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </DialogBody> */}
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button onClick={handleLogOut}>LogOut</Button>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>

            <ColorModeButton />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
