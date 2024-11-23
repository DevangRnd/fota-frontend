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
  DialogRoot,
  DialogTitle,
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
        <Text fontSize="2xl" letterSpacing={1} mb={2}>
          Upload Devices Excel or CSV File
        </Text>
        <Input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
        />
        {file && (
          <Badge variant={"subtle"} fontSize="sm" colorPalette={"green"} my={2}>
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
                <DialogBody overflow={"hidden"}>
                  {failedDevices.map((deviceId) => (
                    <Text fontWeight={"bold"} key={deviceId}>
                      {deviceId}
                    </Text>
                  ))}
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
