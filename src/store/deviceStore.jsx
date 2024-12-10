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

  fetchData: async (vendorId) => {
    set({ loading: true });

    try {
      const [devicesResponse, firmwaresResponse] = await Promise.all([
        axios.get(`http://103.127.29.215/api/vendor/${vendorId}/devices`),
        axios.get("http://103.127.29.215/api/firmwares"),
      ]);

      // Assuming each device now has an `updateStatus` field directly from the backend
      set({
        allDevices: devicesResponse.data.devices,
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
      await axios.post(`${import.meta.env.VITE_API_URL}/initiate-update`, {
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

  // uploadDevices: async (vendorId, file) => {
  //   set({ loading: true });

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     await axios.post(
  //       `http://103.127.29.215/api/vendor/${vendorId}/add-device`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     toaster.success({
  //       title: "Devices Added Successfully",
  //       description: "Go To Device Management",
  //       duration: 3000,
  //       isClosable: true,
  //     });

  //     set({ deviceIds: "" }); // Clear deviceIds if needed
  //   } catch (error) {
  //     console.error("Error uploading devices:", error);
  //     toaster.error({
  //       title: "Oh! No",
  //       description: "Error Uploading Devices",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
}));

export default useDeviceStore;
