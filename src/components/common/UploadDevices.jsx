import React from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import useUploadStore from "../../store/uploadStore";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
const UploadDevices = () => {
  const {
    file,
    loading,
    successfulDevices,
    failedDevices,
    setFile,
    uploadFile,
    resetDevices,
  } = useUploadStore();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    resetDevices();
  };

  const handleUpload = async () => {
    await uploadFile();
  };

  return (
    <Flex
      h="100dvh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction={"column"}
    >
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        w="100%"
        maxW="md"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Upload Devices Excel or CSV File
        </Text>
        <Input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
          mb={4}
        />
        <Button
          colorScheme="teal"
          onClick={handleUpload}
          isDisabled={!file || loading}
        >
          {loading ? <Spinner size="sm" /> : "Upload"}
        </Button>
      </Box>
      {(successfulDevices.length > 0 || failedDevices.length > 0) && (
        <Flex gap={4} mt={6}>
          {successfulDevices.length > 0 && (
            <DialogRoot
              size="cover"
              placement="center"
              motionPreset="slide-in-bottom"
            >
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
                  {successfulDevices.map((deviceId) => (
                    <Text key={deviceId} color="white" p={2}>
                      {deviceId}
                    </Text>
                  ))}
                </DialogBody>
              </DialogContent>
            </DialogRoot>
          )}

          {failedDevices.length > 0 && (
            <DialogRoot
              size="cover"
              placement="center"
              motionPreset="slide-in-bottom"
            >
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
                  {failedDevices.map((deviceId) => (
                    <Text key={deviceId} color="white" p={2}>
                      {deviceId}
                    </Text>
                  ))}
                </DialogBody>
              </DialogContent>
            </DialogRoot>
          )}
        </Flex>
      )}
      {/* {successfulDevices.length > 0 && (
        <DialogRoot
          size="cover"
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              See Successfull Devices {successfulDevices.length}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Successfull Devices:</DialogTitle>
              <DialogCloseTrigger />
            </DialogHeader>
            <DialogBody>
              {successfulDevices.map((deviceId) => (
                <Text key={deviceId} color="white">
                  {deviceId}
                </Text>
              ))}
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}
      {failedDevices.length > 0 && (
        <DialogRoot
          size="cover"
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              See Failed Devices {failedDevices.length}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Failed Devices:</DialogTitle>
              <DialogCloseTrigger />
            </DialogHeader>
            <DialogBody>
              {failedDevices.map((deviceId) => (
                <Text key={deviceId} color="white">
                  {deviceId}
                </Text>
              ))}
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )} */}
    </Flex>
  );
};

export default UploadDevices;
