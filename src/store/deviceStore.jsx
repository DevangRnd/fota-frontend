import { create } from "zustand";
import axios from "axios";
import { toaster } from "../components/ui/toaster";

const useDeviceStore = create((set, get) => ({
  loading: false, // For initial page load
  buttonLoading: false, // For button-specific loading during initiate update
  allDevices: [],
  firmwares: [],
  selectedDevices: [],
  selectedFirmware: "",

  fetchData: async () => {
    set({ loading: true });

    try {
      const [devicesResponse, firmwaresResponse] = await Promise.all([
        axios.get("http://103.127.29.215/api/devices"),
        axios.get("http://103.127.29.215/api/firmwares"),
      ]);

      // Assuming each device now has an `updateStatus` field directly from the backend
      set({
        allDevices: devicesResponse.data.allDevices,
        firmwares: firmwaresResponse.data.allFirmwares,
      });
    } catch (error) {
      toaster.error({
        title: "Some Error Occurred",
        description: "Please Try After Some Time",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  selectDevice: (deviceId) => {
    set((state) => ({
      selectedDevices: state.selectedDevices.includes(deviceId)
        ? state.selectedDevices.filter((id) => id !== deviceId)
        : [...state.selectedDevices, deviceId],
    }));
  },
  clearSelectedDevices: () => set({ selectedDevices: [] }),
  selectFirmware: (firmwareName) => {
    set({ selectedFirmware: firmwareName });
  },

  initiateUpdate: async () => {
    set({ buttonLoading: true });

    const { selectedDevices, selectedFirmware, fetchData } = get();

    try {
      await axios.post("http://103.127.29.215/api/initiate-update", {
        deviceIds: selectedDevices,
        firmwareName: selectedFirmware,
      });

      set({
        selectedDevices: [],
        selectedFirmware: "",
        success: "Update initiated successfully",
      });
      toaster.success({
        title: "Successfully Initiated",
        description: `Update For Selected Devices (${selectedDevices.length})`,
        duration: 7000,
        isClosable: true,
      });
      await fetchData();
    } catch (error) {
      toaster.error({
        title: "Failed To Initiate Update",
        description: "Please Try After Some Time",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
      console.error(error);
    } finally {
      set({ buttonLoading: false });
    }
  },

  setDeviceIds: (ids) => set({ deviceIds: ids }),

  uploadDevices: async () => {
    const deviceIds = get().deviceIds;
    set({ loading: true });

    try {
      await axios.post("http://103.127.29.215/api/add-device", {
        deviceId: deviceIds.split(",").map((id) => id.trim()),
      });
      toaster.success({
        title: "Devices Added Successfully",
        description: "Go To Device Management",
        duration: 3000,
        isClosable: true,
      });
      set({ deviceIds: "" });
    } catch (error) {
      console.error("Error uploading devices:", error);
      toaster.error({
        title: "Oh! No",
        description: "Error Uploading Devices",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDeviceStore;
