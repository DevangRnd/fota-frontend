import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  LogOut,
  Laptop,
  Upload,
  Box as BoxIcon,
} from "lucide-react";

import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../ui/menu";

import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
} from "../ui/dialog";

import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerCloseTrigger,
} from "../ui/drawer";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import { Avatar } from "../ui/avatar";
import { toaster } from "../ui/toaster";
import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogOut = () => {
    logout();
    navigate("/login");
    toaster.create({
      title: "Logged Out Successfully",
      duration: 3000,
    });
  };

  const getInitials = (username) => {
    return username ? username.slice(0, 2).toUpperCase() : "U";
  };

  const NavItems = ({ mobile = false }) => (
    <Flex
      direction={mobile ? "column" : "row"}
      alignItems={mobile ? "start" : "center"}
      gap={mobile ? 4 : 6}
    >
      <NavLink
        to="/"
        style={({ isActive }) => ({
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          borderRadius: "6px",
          transition: "all 0.2s",
          background: isActive ? "var(--chakra-colors-white)" : "transparent",
          color: isActive ? "black" : "inherit",
        })}
      >
        <Laptop size={18} />
        <span>All Devices</span>
      </NavLink>

      <NavLink
        to="/firmware-upload"
        style={({ isActive }) => ({
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          borderRadius: "6px",
          transition: "all 0.2s",
          background: isActive ? "var(--chakra-colors-white)" : "transparent",
          color: isActive ? "black" : "inherit",
        })}
      >
        <Upload size={18} />
        <span>Firmware Upload</span>
      </NavLink>

      <NavLink
        to="/upload-devices"
        style={({ isActive }) => ({
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 12px",
          borderRadius: "6px",
          transition: "all 0.2s",
          background: isActive ? "var(--chakra-colors-white)" : "transparent",
          color: isActive ? "black" : "inherit",
        })}
      >
        <BoxIcon size={18} />
        <span>Upload Devices</span>
      </NavLink>
    </Flex>
  );

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="50"
      borderBottom="1px"
      borderColor="gray.200"
      bg="blue.500"
      backdropFilter="blur(10px)"
    >
      <Flex maxW="container.xl" mx="auto" h="14" px="4" alignItems="center">
        <Flex mr="4" alignItems="center" gap="2">
          <Text fontSize="xl" fontWeight="bold">
            IoT FOTA
          </Text>
        </Flex>

        {/* Mobile Menu */}
        <Flex flex="1" alignItems="center" justifyContent="space-between">
          <DrawerRoot>
            <DrawerTrigger asChild hideFrom="lg">
              <Button variant="ghost" size="sm">
                <MenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerBackdrop />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <NavItems mobile />
                <Box mt="4">
                  <ColorModeButton />
                </Box>
              </DrawerBody>
              <DrawerCloseTrigger />
            </DrawerContent>
          </DrawerRoot>

          {/* Desktop Menu */}
          <Box as="nav" display={{ base: "none", lg: "block" }} flex="1">
            <NavItems />
          </Box>

          <Flex alignItems="center" gap="4">
            <Box display={{ base: "none", lg: "block" }}>
              <ColorModeButton />
            </Box>

            <MenuRoot>
              <MenuTrigger asChild>
                <Button
                  variant="ghost"
                  w="8"
                  h="8"
                  p="0"
                  minW="8"
                  borderRadius="full"
                >
                  <Avatar size="sm">{getInitials(user?.username)}</Avatar>
                </Button>
              </MenuTrigger>
              <MenuContent>
                <Box px="2" py="1.5" fontSize="sm" fontWeight="medium">
                  @{user?.username}
                </Box>
                <DialogRoot>
                  <DialogTrigger asChild>
                    <MenuItem
                      value="logout"
                      color="red.500"
                      _hover={{ bg: "red.50" }}
                    >
                      <Flex alignItems="center" gap="2">
                        <LogOut size={16} />
                        <span>Log out</span>
                      </Flex>
                    </MenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to logout?
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogActionTrigger>
                      <Button onClick={handleLogOut} colorScheme="red">
                        Log out
                      </Button>
                    </DialogFooter>
                    <DialogCloseTrigger />
                  </DialogContent>
                </DialogRoot>
              </MenuContent>
            </MenuRoot>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
