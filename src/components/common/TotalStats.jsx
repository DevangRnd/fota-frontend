import { Box, HStack, Icon } from "@chakra-ui/react";
import { StatLabel, StatRoot, StatValueText } from "../ui/stat";
import useDeviceStore from "../../store/deviceStore";
import { CheckCheck, Loader, SatelliteDish } from "lucide-react";

const TotalStats = () => {
  const { allDevices } = useDeviceStore();

  const pendingDevices = allDevices.filter((d) =>
    d.firmwareStatus.includes("Pending")
  );

  const successfullyUpdated = allDevices.filter((d) =>
    d.firmwareStatus.includes("Completed")
  );

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
      gap={10}
    >
      <StatRoot borderWidth="1px" p="4" rounded="md">
        <HStack justify="space-between">
          <StatLabel>Total Devices</StatLabel>
          <Icon color="purple.500">
            <SatelliteDish />
          </Icon>
        </HStack>
        <StatValueText>
          {allDevices.length === 0 ? "0" : allDevices.length}
        </StatValueText>
      </StatRoot>
      <StatRoot borderWidth="1px" p="4" rounded="md" colorPalette={"yellow"}>
        <HStack justify="space-between">
          <StatLabel>Pending Update</StatLabel>
          <Icon color="yellow.500">
            <Loader />
          </Icon>
        </HStack>
        <StatValueText>
          {pendingDevices.length === 0 ? "0" : pendingDevices.length}
        </StatValueText>
      </StatRoot>
      <StatRoot borderWidth="1px" p="4" rounded="md" colorPalette={"green"}>
        <HStack justify="space-between">
          <StatLabel>Successfully Updated</StatLabel>
          <Icon color="fg.success">
            <CheckCheck />
          </Icon>
        </HStack>
        <StatValueText>
          {successfullyUpdated.length === 0 ? "0" : successfullyUpdated.length}
        </StatValueText>
      </StatRoot>
    </Box>
  );
};

export default TotalStats;
