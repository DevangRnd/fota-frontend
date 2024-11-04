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
import { Menu } from "lucide-react";
import { ColorModeButton } from "../ui/color-mode";
const Navbar = () => {
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
            <ColorModeButton />
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};

export default Navbar;
