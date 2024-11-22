import { useEffect, useState } from "react";
import { Box, Button, Spinner, Table, Text, Input } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox";
import { Alert } from "../ui/alert";
import useDeviceStore from "../../store/deviceStore";
import { LuSearch } from "react-icons/lu";
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

  // Handle search filtering across all fields with Object.values
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

  // Handle page change
  const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Select All functionality
  const handleSelectAll = () => {
    const deviceIds = currentDevices.map((device) => device.deviceId);
    deviceIds.forEach(selectDevice);
  };

  if (loading) {
    return (
      <Box h={"100dvh"} w={"100%"} display={"grid"} placeItems={"center"}>
        <Spinner color={"blue.500"} size={"lg"} />
      </Box>
    );
  }

  return (
    <Box w={"80%"} mx={"auto"} my={10} overflowX={"scroll"}>
      {/* <Text as={"label"} my={2} htmlFor="select" fontSize={"xl"}>
        Select Firmware:
      </Text> */}
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
        alignItems={"center"}
        gridTemplateColumns={{ base: "repeat(1,1fr)", lg: "repeat(3,1fr)" }}
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

        {/* <Button onClick={handleSelectAll}>Select All on Page</Button> */}
      </Box>
      {searchTerm.trim() !== "" ? (
        <Alert
          variant={"subtle"}
          title={`Search Results for -  ${searchTerm}`}
          icon={<LuSearch />}
        />
      ) : null}
      <Alert
        variant={"outline"}
        my={3}
        title={`No. Of Items: ${filteredDevices.length}`}
      />

      <Table.Root
        size={"md"}
        variant={"outline"}
        interactive
        showColumnBorder
        stickyHeader
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Device ID</Table.ColumnHeader>
            <Table.ColumnHeader>Vendor</Table.ColumnHeader>
            <Table.ColumnHeader>District</Table.ColumnHeader>
            <Table.ColumnHeader>Block</Table.ColumnHeader>
            <Table.ColumnHeader>Panchayat</Table.ColumnHeader>
            <Table.ColumnHeader>Firmware Status</Table.ColumnHeader>
            <Table.ColumnHeader onClick={handleSelectAll} cursor={"pointer"}>
              <Text>Select All</Text>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentDevices.map((device) => (
            <Table.Row key={device._id}>
              <Table.Cell>{device.deviceId}</Table.Cell>
              <Table.Cell>{device.vendor}</Table.Cell>
              <Table.Cell>{device.district}</Table.Cell>
              <Table.Cell>{device.block}</Table.Cell>
              <Table.Cell>{device.panchayat}</Table.Cell>
              <Table.Cell>{device.firmwareStatus || "-"}</Table.Cell>
              <Table.Cell>
                <Checkbox
                  colorPalette={"green"}
                  checked={selectedDevices.includes(device.deviceId)}
                  onChange={() => selectDevice(device.deviceId)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent={"center"} mt={4}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            mx={1}
            onClick={() => paginate(i + 1)}
            isActive={i + 1 === currentPage}
            colorScheme={i + 1 === currentPage ? "teal" : "gray"}
            variant={i + 1 === currentPage ? "solid" : "outline"}
          >
            {i + 1}
          </Button>
        ))}
      </Box>

      {buttonLoading ? (
        <Button my={4} disabled color={"gray.400"}>
          <Spinner /> Initiating Update
        </Button>
      ) : (
        <Button
          onClick={initiateUpdate}
          disabled={!selectedFirmware || selectedDevices.length === 0}
          my={4}
        >
          Initiate Update
        </Button>
      )}
    </Box>
  );
};

export default DeviceManagement;
