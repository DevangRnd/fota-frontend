import { useEffect, useState } from "react";
import { format } from "date-fns";
import "../../backgroundAnimation.css";
import {
  Box,
  Button,
  Spinner,
  Table,
  Badge,
  Grid,
  Text,
  Flex,
  Card,
  Input,
} from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
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
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "../ui/breadcrumb";

import TotalStats from "./TotalStats";
import { ChevronRight, ChevronsRight, FileCog, SearchCode } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
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
  const location = useLocation();
  // State for search, pagination, and items per page
  const [searchTerm, setSearchTerm] = useState({
    vendor: "",
    district: "",
    block: "",
    panchayat: "",
    uploadedOn: "",
  });
  const [deviceIdSearch, setDeviceIdSearch] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // Reset to the first page on filter change
  };
  // const [secondarySearchTerm, setSecondarySearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [devicesPerPage, setDevicesPerPage] = useState(10);
  const { vendorId } = useParams();
  // Fetch data when component mounts
  useEffect(() => {
    fetchData(vendorId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!allDevices) {
    return <Text>No Devices Found For This Vendor</Text>;
  }
  // Filtered devices based on search term
  const filteredDevices = allDevices.filter((device) => {
    const search = deviceIdSearch.toLowerCase().trim();

    return (
      (!searchTerm.vendor ||
        device.vendor
          .toLowerCase()
          .includes(searchTerm.vendor.toLowerCase())) &&
      (!searchTerm.uploadedOn ||
        device.uploadedOn.includes(searchTerm.uploadedOn)) &&
      (!searchTerm.district ||
        device.district
          .toLowerCase()
          .includes(searchTerm.district.toLowerCase())) &&
      (!searchTerm.block ||
        device.block.toLowerCase().includes(searchTerm.block.toLowerCase())) &&
      (!searchTerm.panchayat ||
        device.panchayat
          .toLowerCase()
          .includes(searchTerm.panchayat.toLowerCase())) &&
      (!search || device.deviceId.toLowerCase().includes(search)) &&
      !searchTerm.uploadedOn
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

  // const allVendors = [...new Set(allDevices.map((device) => device.vendor))];
  const allDistricts = [
    ...new Set(allDevices.map((device) => device.district)),
  ];
  const allBlocks = [...new Set(allDevices.map((device) => device.block))];
  const allPanchayats = [
    ...new Set(allDevices.map((device) => device.panchayat)),
  ];

  if (loading) {
    return (
      <Box h={"100vh"} w={"100%"} display={"grid"} placeItems={"center"}>
        <Spinner color={"blue.500"} size={"lg"} />
      </Box>
    );
  }

  return (
    <Box position={"relative"} overflow={"hidden"}>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <Flex flexDirection={"column"} gap={5} w={"80%"} mx={"auto"} my={10}>
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          All Devices For {location.state.vendorName}
        </Text>
        <TotalStats />
        <Card.Root
          flexDirection={"column"}
          py={5}
          px={5}
          rounded={"xl"}
          shadow={"2xl"}
          justifyContent={"space-between"}
        >
          <Text mb={4} fontSize={"2xl"}>
            Apply Filters:
          </Text>
          <Grid
            shadowColor={"white"}
            gridTemplateColumns={{ md: "repeat(1,1fr)", lg: "repeat(3,1fr)" }}
            gap={10}
          >
            <Box
              name="district"
              rounded={"md"}
              fontSize={"0.87rem"}
              p={2}
              as={"select"}
              value={searchTerm.district}
              onChange={handleChange}
              _focus={{ outline: "2px solid gray", outlineOffset: "2px" }}
              transition={"all 0.1s ease-in-out"}
            >
              <option value="">All Districts</option>
              {allDistricts.map((district, index) => (
                <option value={district} key={index}>
                  {district}
                </option>
              ))}
            </Box>
            <Box
              name="block"
              rounded={"md"}
              fontSize={"0.87rem"}
              p={2}
              as={"select"}
              value={searchTerm.block}
              onChange={handleChange}
              _focus={{ outline: "2px solid gray", outlineOffset: "2px" }}
              transition={"all 0.1s ease-in-out"}
            >
              <option value="">All Blocks</option>
              {allBlocks.map((block, index) => (
                <option value={block} key={index}>
                  {block}
                </option>
              ))}
            </Box>
            <Box
              name="panchayat"
              rounded={"md"}
              fontSize={"0.87rem"}
              p={2}
              as={"select"}
              value={searchTerm.panchayat}
              onChange={handleChange}
              _focus={{ outline: "2px solid gray", outlineOffset: "2px" }}
              transition={"all 0.1s ease-in-out"}
            >
              <option value="">All Panchayats</option>
              {allPanchayats.map((panchayat, index) => (
                <option value={panchayat} key={index}>
                  {panchayat}
                </option>
              ))}
            </Box>
          </Grid>
        </Card.Root>

        {/* Breadcrumbs showing different levels of search */}
        {(searchTerm.vendor ||
          searchTerm.district ||
          searchTerm.block ||
          searchTerm.panchayat) && (
          <Alert
            variant={"subtle"}
            icon={<ChevronRight />}
            title={`Search Results (${filteredDevices.length})`}
          >
            <BreadcrumbRoot size="lg" separator={<ChevronsRight />}>
              {searchTerm.district ? (
                !searchTerm.block && !searchTerm.panchayat ? (
                  <BreadcrumbCurrentLink>
                    District: {searchTerm.district}
                  </BreadcrumbCurrentLink>
                ) : (
                  <BreadcrumbLink>
                    District: {searchTerm.district}
                  </BreadcrumbLink>
                )
              ) : null}
              {searchTerm.block ? (
                !searchTerm.panchayat ? (
                  <BreadcrumbCurrentLink>
                    Block: {searchTerm.block}
                  </BreadcrumbCurrentLink>
                ) : (
                  <BreadcrumbLink>Block: {searchTerm.block}</BreadcrumbLink>
                )
              ) : null}
              {searchTerm.panchayat && (
                <BreadcrumbCurrentLink>
                  Panchayat: {searchTerm.panchayat}
                </BreadcrumbCurrentLink>
              )}
            </BreadcrumbRoot>
          </Alert>
        )}
        {/* Per Page Filter and Device ID Search */}
        <Box
          display={"grid"}
          gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          my={4}
          gap={5}
        >
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
          <InputGroup startElement={<SearchCode />}>
            <Input
              variant={"subtle"}
              placeholder="Search For Device ID"
              value={deviceIdSearch}
              onChange={(e) => setDeviceIdSearch(e.target.value)}
            />
          </InputGroup>
        </Box>
        {deviceIdSearch.trim() && (
          <Alert title="Searching for Device Id">{deviceIdSearch}</Alert>
        )}
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
        <Table.ScrollArea borderWidth={"1px"} maxW={"100%"}>
          <Table.Root
            size={"md"}
            variant={"outline"}
            showColumnBorder
            colorPalette={"blue"}
          >
            <Table.Header bg={"blue.700"} _light={{ bg: "blue.200" }}>
              <Table.Row>
                <Table.ColumnHeader
                  onClick={handleSelectAll}
                  cursor={"pointer"}
                >
                  Select All
                </Table.ColumnHeader>
                <Table.ColumnHeader>Device ID</Table.ColumnHeader>

                <Table.ColumnHeader>District</Table.ColumnHeader>
                <Table.ColumnHeader>Block</Table.ColumnHeader>
                <Table.ColumnHeader>Panchayat</Table.ColumnHeader>
                <Table.ColumnHeader>Firmware Status</Table.ColumnHeader>
                <Table.ColumnHeader>Signal Strength</Table.ColumnHeader>
                <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
                <Table.ColumnHeader>Uploaded On</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {currentDevices.map((device) => (
                <Table.Row key={device._id}>
                  <Table.Cell>
                    <Checkbox
                      cursor={"pointer"}
                      variant={"solid"}
                      colorPalette={"green"}
                      checked={selectedDevices.includes(device.deviceId)}
                      onChange={() => selectDevice(device.deviceId)}
                    />
                  </Table.Cell>
                  <Table.Cell>{device.deviceId}</Table.Cell>

                  <Table.Cell>{device.district}</Table.Cell>
                  <Table.Cell>{device.block}</Table.Cell>
                  <Table.Cell>{device.panchayat}</Table.Cell>
                  <Table.Cell>
                    {device.firmwareStatus === "Null" && (
                      <Badge
                        variant={"solid"}
                        size={{ base: "sm", lg: "md" }}
                        colorPalette={"red"}
                      >
                        {device.firmwareStatus}
                      </Badge>
                    )}
                    {device.firmwareStatus.includes("Pending") && (
                      <Badge
                        variant={"solid"}
                        size={{ base: "sm", lg: "md" }}
                        colorPalette={"yellow"}
                      >
                        {device.firmwareStatus}
                      </Badge>
                    )}
                    {device.firmwareStatus.includes("Completed") && (
                      <Badge
                        variant={"solid"}
                        size={{ base: "sm", lg: "md" }}
                        colorPalette={"green"}
                      >
                        {device.firmwareStatus}
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant={"surface"}
                      size={{ base: "sm", lg: "md" }}
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
                      {device.signalStrength || "0"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge size={"md"}>
                      {device.lastUpdated
                        ? format(
                            new Date(device.lastUpdated),
                            "MMM d, yyyy, h:mm:ss a"
                          )
                        : "Not Available"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge size={"md"} variant={"subtle"}>
                      {device.createdAt
                        ? format(
                            new Date(device.createdAt),
                            "MMM d, yyyy, h:mm:ss a"
                          )
                        : "Not Available"}
                    </Badge>
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
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
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
                    You are about to initiate update for{" "}
                    {selectedDevices.length} devices. With firmware version{" "}
                    {firmwares.map((f) => f.name)}
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
      </Flex>
    </Box>
  );
};

export default DeviceManagement;
