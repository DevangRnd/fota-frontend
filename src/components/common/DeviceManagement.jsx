import { useEffect, useState } from "react";
import { Box, Button, Spinner, Table, Input } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";
import { Alert } from "../ui/alert";
import useDeviceStore from "../../store/deviceStore";
import { LuSearch } from "react-icons/lu";
import {
  DialogActionTrigger,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  DialogContent,
} from "../ui/dialog";

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
    buttonLoading,
    initiateUpdate,
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
    const search = searchTerm.toLowerCase();
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
      <Box
        id="select"
        fontSize={"0.9rem"}
        as={"select"}
        w={"100%"}
        p={2}
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

      {/* Search and pagination controls */}
      <Box
        display={"grid"}
        gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
        my={4}
        gap={5}
      >
        <Input
          p={2}
          rounded={"md"}
          placeholder="Search across all fields"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredDevices.length > 10 && (
          <Box
            as={"select"}
            p={2}
            value={devicesPerPage}
            onChange={(e) => setDevicesPerPage(Number(e.target.value))}
            rounded={"md"}
            fontSize={"0.9rem"}
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </Box>
        )}
      </Box>

      {searchTerm.trim() !== "" && (
        <Alert
          variant={"subtle"}
          title={`Search Results for - ${searchTerm}`}
          icon={<LuSearch />}
        />
      )}
      <Alert
        variant={"outline"}
        my={3}
        title={`No. Of Items: ${filteredDevices.length}`}
      />

      <Table.ScrollArea borderWidth={"1px"} maxW={"100%"}>
        <Table.Root
          size={"md"}
          variant={"outline"}
          interactive
          showColumnBorder
          stickyHeader
        >
          <Table.Header>
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
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentDevices.map((device) => (
              <Table.Row key={device._id}>
                <Table.Cell>
                  <Checkbox
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
                <Table.Cell>{device.firmwareStatus || "-"}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent={"center"} mt={4}>
        {generatePageNumbers().map((page, i) => (
          <Button
            key={i}
            size={"sm"}
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
      </Box>

      {buttonLoading ? (
        <Button my={4} disabled color={"gray.400"}>
          <Spinner /> Initiating Update
        </Button>
      ) : (
        <DialogRoot size={"lg"} placement={"center"} motionPreset={"scale"}>
          <DialogTrigger>
            <Button
              disabled={!selectedFirmware || selectedDevices.length === 0}
              my={4}
            >
              Initiate Update
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader fontSize={"2xl"} fontWeight={"bold"}>
              Please Confirm
            </DialogHeader>
            <DialogBody>
              <p>
                You are about to initiate update for {selectedDevices.length}{" "}
                devices. With firmware version {firmwares.map((f) => f.name)}
              </p>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogActionTrigger>
                <Button onClick={initiateUpdate}>Proceed</Button>
              </DialogFooter>
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}
    </Box>
  );
};

export default DeviceManagement;
