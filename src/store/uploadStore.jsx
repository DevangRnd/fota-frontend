import { create } from "zustand";
import axios from "axios";
import { toaster } from "../components/ui/toaster";

const useUploadStore = create((set, get) => ({
  file: null,
  loading: false,
  successfulDevices: [],
  failedDevices: [],

  setFile: (file) => set({ file }),

  resetDevices: () => set({ successfulDevices: [], failedDevices: [] }),

  uploadFile: async () => {
    set({ loading: true });
    const { file } = get();

    if (!file) {
      toaster.create({
        title: "Error Occurred",
        description: "Please provide an Excel or CSV file.",
        duration: 5000,
        isClosable: true,
        type: "warning",
      });
      set({ loading: false });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://fota-backend.onrender.com/api/add-device",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Extract the correct data from the response
      const successfulDevices = response.data.addedDevices || [];
      const failedDevices = response.data.errors || [];

      set({
        successfulDevices,
        failedDevices,
      });

      console.log("Response data:", response.data);
      console.log(
        `Successful: ${successfulDevices.length}, Failed: ${failedDevices.length}`
      );

      // Check conditions in the correct order
      if (successfulDevices.length > 0 && failedDevices.length > 0) {
        toaster.create({
          title: "Partial Success",
          description: `${successfulDevices.length} devices were successfully uploaded, ${failedDevices.length} devices failed.`,
          duration: 5000,
          type: "warning",
          isClosable: true,
        });
      } else if (successfulDevices.length > 0) {
        toaster.success({
          title: "Upload Successful",
          description: `${successfulDevices.length} devices were uploaded successfully.`,
          duration: 5000,
          isClosable: true,
        });
      } else if (failedDevices.length > 0) {
        toaster.error({
          title: "Upload Failed",
          description: `Failed to upload devices: ${failedDevices.join(", ")}`,
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toaster.error({
        title: "Upload Error",
        description: "An error occurred during the upload process.",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      set({ loading: false, file: null });
    }
  },
}));

export default useUploadStore;
