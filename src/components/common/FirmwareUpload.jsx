import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Spinner,
  Field,
  defineStyle,
} from "@chakra-ui/react";
import { FileUp } from "lucide-react";
import useFirmwareStore from "../../store/firmwareStore.jsx";

const FirmwareUpload = () => {
  // State variables
  const {
    name,
    setName,
    file,
    isLoading,
    handleFileSelect,
    handleFirmwareUpload,
  } = useFirmwareStore();
  const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
      color: "fg",
      top: "2.5",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: "fg.muted",
      top: "-3",
      insetStart: "2",
    },
  });

  return (
    <Box
      h="calc(100dvh - 56px)"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        spacing={1}
        width={["300px", "400px", "500px"]}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        shadow={"2xl"}
        shadowColor={"white"}
      >
        <Text letterSpacing={2} fontSize={"2xl"} mb={2}>
          Upload Firmware
        </Text>
        <Field.Root>
          <Box pos={"relative"} w={"full"}>
            <Input
              className="peer"
              placeholder=""
              width="100%"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Field.Label css={floatingStyles}>
              Enter Firmware Name Here..
            </Field.Label>
          </Box>
        </Field.Root>

        <Input
          type="file"
          width="100%"
          p={1}
          onChange={handleFileSelect}
          accept=".bin" // Limit file picker to .bin files
        />

        {file && (
          <Text fontSize="sm" color="green.500" py={2}>
            Selected File: {file.name}
          </Text>
        )}
        {isLoading ? (
          <Button my={2} disabled color={"gray.400"}>
            <Spinner /> Uploading..
          </Button>
        ) : (
          <Button
            my={2}
            colorScheme="blue"
            width="100%"
            onClick={handleFirmwareUpload}
            disabled={!name || !file}
          >
            <FileUp />
            Start Uploading
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default FirmwareUpload;
