import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  Spinner,
  Flex,
  Badge,
} from "@chakra-ui/react";
import useUploadStore from "../../store/uploadStore";
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "../ui/breadcrumb";
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../ui/menu";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";
import { CircleChevronRight, CloudUpload } from "lucide-react";
import { Alert } from "../ui/alert";
import { toaster } from "../ui/toaster";
const UploadDevices = () => {
  const {
    file,
    loading,
    successfulDevices,
    failedDevices,
    setFile,
    uploadFile,
    resetDevices,
    getAllProjects,
    allProjects,
  } = useUploadStore();

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");

  // Fetch projects when the component mounts
  useEffect(() => {
    getAllProjects();
  }, []);

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    resetDevices();
  };

  // Handle upload button click
  const handleUpload = async () => {
    if (!selectedVendor) {
      toaster.create({
        title: "Please Select A Vendor First",
        type: "error",
        duration: 3000,
      });
    }
    await uploadFile(selectedVendor);
  };

  // Get vendors from the selected project
  const vendors =
    allProjects.find((project) => project._id === selectedProject)?.vendors ||
    [];

  return (
    <Flex
      h="calc(100dvh - 56px)"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
      flexDirection={"column"}
    >
      <Alert
        variant={"subtle"}
        title=" Please Select Desired Project and Then The Vendor"
        w={"md"}
      />
      {selectedProject && (
        <Alert
          status={"success"}
          my={7}
          w="md"
          title="Selection"
          icon={<CircleChevronRight />}
        >
          <Flex flexDirection={"column"} gap={4}>
            <BreadcrumbRoot size={"lg"}>
              <BreadcrumbLink>
                {allProjects.find((project) => project._id === selectedProject)
                  ?.name || "No Project"}
              </BreadcrumbLink>
              <BreadcrumbCurrentLink>
                {" "}
                {vendors.find((vendor) => vendor._id === selectedVendor)
                  ?.name || "No Vendor Selected"}
              </BreadcrumbCurrentLink>
            </BreadcrumbRoot>
          </Flex>
        </Alert>
      )}

      <Box w={"md"} display={"flex"} justifyContent={"space-between"} py={3}>
        {/* Project Selection */}
        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" size="sm">
              Select Project
            </Button>
          </MenuTrigger>
          <MenuContent minW="10rem">
            <MenuRadioItemGroup
              value={selectedProject}
              onValueChange={(e) => setSelectedProject(e.value)}
            >
              {allProjects.map((project) => (
                <MenuRadioItem key={project._id} value={project._id}>
                  {project.name}
                </MenuRadioItem>
              ))}
            </MenuRadioItemGroup>
          </MenuContent>
        </MenuRoot>

        <MenuRoot>
          <MenuTrigger asChild>
            <Button variant="outline" size="sm">
              Select Vendor
            </Button>
          </MenuTrigger>
          <MenuContent minW="10rem">
            <MenuRadioItemGroup
              value={selectedVendor}
              onValueChange={(e) => setSelectedVendor(e.value)}
            >
              {vendors.map((vendor) => (
                <MenuRadioItem
                  disabled={!selectedProject}
                  key={vendor._id}
                  value={vendor._id}
                >
                  {vendor.name}
                </MenuRadioItem>
              ))}
            </MenuRadioItemGroup>
          </MenuContent>
        </MenuRoot>
      </Box>

      {/* File Upload */}
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        w="100%"
        maxW="md"
        textAlign="center"
      >
        <Text fontSize="2xl" letterSpacing={1} mb={2}>
          Upload Devices Excel or CSV File
        </Text>
        <Input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
        />
        {file && (
          <Badge variant="subtle" fontSize="sm" colorScheme="green" my={2}>
            Selected File: {file.name}
          </Badge>
        )}
        {loading ? (
          <Button width={"full"} my={2}>
            <Spinner mr={2} />
            Uploading..
          </Button>
        ) : (
          <Button
            my={2}
            width={"full"}
            onClick={handleUpload}
            disabled={!file || loading}
          >
            <CloudUpload />
            Upload File
          </Button>
        )}
      </Box>

      {/* Results */}
      {(successfulDevices.length > 0 || failedDevices.length > 0) && (
        <Flex gap={4} mt={6}>
          {successfulDevices.length > 0 && (
            <DialogRoot size="full" motionPreset="slide-in-bottom">
              <DialogTrigger asChild>
                <Button variant={"outline"} color={"green.500"}>
                  Successful Devices ({successfulDevices.length})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Successful Devices:</DialogTitle>
                  <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={{
                      sm: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                      lg: "repeat(3,1fr)",
                      xl: "repeat(4,1fr)",
                    }}
                    gap={5}
                  >
                    {successfulDevices.map((deviceId) => (
                      <Badge
                        variant={"surface"}
                        py={2}
                        colorPalette={"green"}
                        key={deviceId}
                      >
                        {deviceId}
                      </Badge>
                    ))}
                  </Box>
                </DialogBody>
              </DialogContent>
            </DialogRoot>
          )}

          {failedDevices.length > 0 && (
            <DialogRoot size="full" motionPreset="slide-in-bottom">
              <DialogTrigger asChild>
                <Button variant={"outline"} color={"red.500"}>
                  Failed Devices ({failedDevices.length})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Failed Devices:</DialogTitle>
                  <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={{
                      sm: "repeat(1,1fr)",
                      md: "repeat(2,1fr)",
                      lg: "repeat(3,1fr)",
                      xl: "repeat(4,1fr)",
                    }}
                    gap={5}
                  >
                    {failedDevices.map((deviceId) => (
                      <Badge
                        variant={"surface"}
                        py={2}
                        colorPalette={"red"}
                        key={deviceId}
                      >
                        {deviceId}
                      </Badge>
                    ))}
                  </Box>
                </DialogBody>
              </DialogContent>
            </DialogRoot>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default UploadDevices;
