import { useEffect, useState } from "react";

import { formatDistanceToNow } from "date-fns";
import {
  Box,
  Button,
  Spinner,
  Table,
  Input,
  Badge,
  Group,
  InputAddon,
} from "@chakra-ui/react";

import { Checkbox } from "../ui/checkbox";
import { Alert } from "../ui/alert";
import useDeviceStore from "../../store/deviceStore";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import {
  DialogActionTrigger,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import {
  ActionBarRoot,
  ActionBarContent,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "../ui/action-bar";

import TotalStats from "./TotalStats";
import { ChevronsLeftRight, FileCog, SearchIcon } from "lucide-react";
const DeviceManagement = () => {
  const {
    loading,
    fetchData,
    allDevices,
    firmwares,
    selectedDevices,
    selectedFirmware,
    selectDevice,
    selectFirmware,
    initiateUpdate,
    clearSelectedDevices,
  } = useDeviceStore();

  // State for search, pagination, and items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [devicesPerPage, setDevicesPerPage] = useState(10);

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered devices based on search term
  const filteredDevices = allDevices.filter((device) => {
    const search = searchTerm.toLowerCase().trim();
    return Object.values(device).some((value) =>
      String(value).toLowerCase().includes(search)
    );
  });

  // Pagination logic
  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = filteredDevices.slice(
    indexOfFirstDevice,
    indexOfLastDevice
  );

  const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers with ellipses
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };
  // Handle Select All functionality
  const handleSelectAll = () => {
    const deviceIds = currentDevices.map((device) => device.deviceId);
    deviceIds.forEach(selectDevice);
  };

  if (loading) {
    return (
      <Box h={"100vh"} w={"100%"} display={"grid"} placeItems={"center"}>
        <Spinner color={"blue.500"} size={"lg"} />
      </Box>
    );
  }

  return (
    <Box w={"80%"} mx={"auto"} my={10}>
      <TotalStats />

      {/* Search and pagination controls */}
      <Box
        display={"grid"}
        gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        my={4}
        gap={5}
      >
        <Group attached>
          <InputAddon>
            <SearchIcon size={18} />
          </InputAddon>
          <Input
            p={2}
            rounded={"md"}
            placeholder="Search Accross All Fields"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Group>
        {filteredDevices.length > 10 && (
          <Box
            as={"select"}
            p={2}
            value={devicesPerPage}
            onChange={(e) => setDevicesPerPage(Number(e.target.value))}
            rounded={"md"}
            fontSize={"0.87rem"}
          >
            <Box as={"option"} value={10}>
              10 per page
            </Box>
            <Box as={"option"} value={20}>
              20 per page
            </Box>
            <Box as={"option"} value={50}>
              50 per page
            </Box>
          </Box>
        )}
      </Box>

      {searchTerm.trim() !== "" && (
        <Alert
          data-state="open"
          _open={{
            animation: "slide-in 200ms",
          }}
          variant={"subtle"}
          title={`Search Results for:- ${searchTerm} (${filteredDevices.length})`}
          icon={<ChevronsLeftRight />}
          my={3}
        />
      )}

      <Box
        id="select"
        fontSize={"0.9rem"}
        as={"select"}
        w={"100%"}
        p={2}
        my={3}
        value={selectedFirmware}
        onChange={(e) => selectFirmware(e.target.value)}
        rounded={"md"}
      >
        <option value="" disabled>
          Select Firmware
        </option>
        {firmwares.map((firmware) => (
          <option value={firmware.name} key={firmware._id}>
            {firmware.name}
          </option>
        ))}
      </Box>
      <Table.ScrollArea borderWidth={"1px"} maxW={"100%"}>
        <Table.Root
          size={"md"}
          variant={"outline"}
          showColumnBorder
          colorPalette={"blue"}
        >
          <Table.Header bg={"blue.700"} _light={{ bg: "blue.200" }}>
            <Table.Row>
              <Table.ColumnHeader onClick={handleSelectAll} cursor={"pointer"}>
                Select All
              </Table.ColumnHeader>
              <Table.ColumnHeader>Device ID</Table.ColumnHeader>
              <Table.ColumnHeader>Vendor</Table.ColumnHeader>
              <Table.ColumnHeader>District</Table.ColumnHeader>
              <Table.ColumnHeader>Block</Table.ColumnHeader>
              <Table.ColumnHeader>Panchayat</Table.ColumnHeader>
              <Table.ColumnHeader>Firmware Status</Table.ColumnHeader>
              <Table.ColumnHeader>Signal Strength</Table.ColumnHeader>
              <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentDevices.map((device) => (
              <Table.Row key={device._id}>
                <Table.Cell>
                  <Checkbox
                    variant={"outline"}
                    colorPalette={"green"}
                    checked={selectedDevices.includes(device.deviceId)}
                    onChange={() => selectDevice(device.deviceId)}
                  />
                </Table.Cell>
                <Table.Cell>{device.deviceId}</Table.Cell>
                <Table.Cell>{device.vendor}</Table.Cell>
                <Table.Cell>{device.district}</Table.Cell>
                <Table.Cell>{device.block}</Table.Cell>
                <Table.Cell>{device.panchayat}</Table.Cell>
                <Table.Cell>
                  {device.firmwareStatus === "Null" && (
                    <Badge variant={"solid"} colorPalette={"red"}>
                      {device.firmwareStatus}
                    </Badge>
                  )}
                  {device.firmwareStatus.includes("Pending") && (
                    <Badge variant={"solid"} colorPalette={"yellow"}>
                      {device.firmwareStatus}
                    </Badge>
                  )}
                  {device.firmwareStatus.includes("Completed") && (
                    <Badge variant={"solid"} colorPalette={"green"}>
                      {device.firmwareStatus}
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={"subtle"}
                    size={"md"}
                    colorPalette={
                      device.signalStrength > 20
                        ? "green"
                        : device.signalStrength > 10
                          ? "yellow"
                          : device.signalStrength > 0
                            ? "red"
                            : "gray"
                    }
                  >
                    {device.signalStrength || "Not Available"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {device.lastUpdated
                    ? `${formatDistanceToNow(new Date(device.lastUpdated))} ago`
                    : "Not Available"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      {/* Pagination Controls */}
      <Box
        display="flex"
        justifyContent="flex-start"
        mt={4}
        alignItems="center"
        flexWrap={"wrap"}
      >
        <Button
          size={{ base: "xs", lg: "sm" }}
          mx={1}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
          colorScheme="teal"
          variant={"outline"}
        >
          <LuChevronLeft />
        </Button>
        {generatePageNumbers().map((page, i) => (
          <Button
            key={i}
            size={{ base: "xs", lg: "sm" }}
            mx={1}
            onClick={() => page !== "..." && paginate(page)}
            isActive={page === currentPage}
            colorScheme={page === currentPage ? "teal" : "gray"}
            variant={page === currentPage ? "solid" : "outline"}
            disabled={page === "..."}
          >
            {page}
          </Button>
        ))}
        <Button
          size={{ base: "xs", lg: "sm" }}
          mx={1}
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          colorScheme="teal"
          variant={"outline"}
        >
          <LuChevronRight />
        </Button>
      </Box>
      <ActionBarRoot
        open={selectedDevices.length > 0}
        closeOnInteractOutside={false}
      >
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selectedDevices.length === 1
              ? `${selectedDevices.length} Device Selected`
              : `${selectedDevices.length} Devices Selected`}
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />

          <Button
            onClick={clearSelectedDevices}
            variant={"outline"}
            size={"sm"}
            colorPalette={"red"}
          >
            Cancel
          </Button>

          <DialogRoot placement="center">
            <DialogTrigger asChild>
              <Button
                variant="surface"
                colorPalette="green"
                size="sm"
                disabled={!selectedFirmware || selectedDevices.length === 0}
              >
                <FileCog />
                Update
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle> Please Confirm</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <DialogDescription>
                  You are about to initiate update for {selectedDevices.length}{" "}
                  devices. With firmware version {firmwares.map((f) => f.name)}
                </DialogDescription>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="subtle">Cancel</Button>
                </DialogActionTrigger>
                <Button
                  colorPalette={"green"}
                  variant={"solid"}
                  onClick={initiateUpdate}
                >
                  Proceed
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </ActionBarContent>
      </ActionBarRoot>
    </Box>
  );
};

export default DeviceManagement;
