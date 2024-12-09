import React, { useEffect, useState } from "react";
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
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";
import { CloudUpload } from "lucide-react";

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
      alert("Please select a vendor before uploading.");
      return;
    }
    await uploadFile(selectedVendor);
  };

  // Get vendors from the selected project
  const vendors =
    allProjects.find((project) => project._id === selectedProject)?.vendors ||
    [];

  return (
    <Flex
      h="100dvh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box w="md">
        {/* Project Selection */}
        <Box as="select" onChange={(e) => setSelectedProject(e.target.value)}>
          <option value="" disabled selected>
            Select Project
          </option>
          {allProjects.map((project) => (
            <option value={project._id} key={project._id}>
              {project.name}
            </option>
          ))}
        </Box>

        {/* Vendor Selection */}
        <Box
          as="select"
          onChange={(e) => setSelectedVendor(e.target.value)}
          disabled={!selectedProject}
        >
          <option value="" disabled selected>
            {selectedProject ? "Select Vendor" : "Select a project first"}
          </option>
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <option value={vendor._id} key={vendor._id}>
                {vendor.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No vendors available
            </option>
          )}
        </Box>
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
          <Button width="full" my={2}>
            <Spinner mr={2} />
            Uploading...
          </Button>
        ) : (
          <Button
            my={2}
            width="full"
            onClick={handleUpload}
            disabled={!file || !selectedVendor || loading}
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
                <Button variant="outline" colorScheme="green">
                  Successful Devices ({successfulDevices.length})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Successful Devices</DialogTitle>
                  <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
                    gap={5}
                  >
                    {successfulDevices.map((deviceId) => (
                      <Badge key={deviceId} variant="solid" colorScheme="green">
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
                <Button variant="outline" colorScheme="red">
                  Failed Devices ({failedDevices.length})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Failed Devices</DialogTitle>
                  <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fit, minmax(100px, 1fr))"
                    gap={5}
                  >
                    {failedDevices.map((deviceId) => (
                      <Badge key={deviceId} variant="solid" colorScheme="red">
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
