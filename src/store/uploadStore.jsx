import { create } from "zustand";
import axios from "axios";
import { toaster } from "../components/ui/toaster";

const useUploadStore = create((set, get) => ({
  file: null,
  loading: false,
  successfulDevices: [],
  failedDevices: [],
  allProjects: [],
  setFile: (file) => set({ file }),

  resetDevices: () => set({ successfulDevices: [], failedDevices: [] }),

  getAllProjects: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-projects`
      );
      set({ allProjects: response.data.projects });
    } catch (error) {
      toaster.create({
        title: "Error Occurred",
        description: "Please try again later.",
        duration: 5000,
        type: "error",
      });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  // Optional: Add this function if vendors need to be fetched individually
  // getVendorsForProject: (projectId) => {
  //   const { allProjects } = get();
  //   const project = allProjects.find((p) => p._id === projectId);
  //   return project ? project.vendors : [];
  // },

  uploadFile: async (vendorId) => {
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
        `${import.meta.env.VITE_API_URL}/vendor/${vendorId}/add-device`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const successfulDevices = response.data.addedDevices || [];
      const failedDevices = response.data.errors || [];

      set({
        successfulDevices,
        failedDevices,
      });

      if (successfulDevices.length > 0 && failedDevices.length > 0) {
        toaster.create({
          title: "Partial Success",
          description: `${successfulDevices.length} devices uploaded successfully, ${failedDevices.length} failed.`,
          duration: 5000,
          type: "warning",
          isClosable: true,
        });
      } else if (successfulDevices.length > 0) {
        toaster.success({
          title: "Upload Successful",
          description: `${successfulDevices.length} devices uploaded successfully.`,
          duration: 5000,
          isClosable: true,
        });
      } else if (failedDevices.length > 0) {
        toaster.error({
          title: "Upload Failed",
          description: `Failed to upload ${failedDevices.length} devices.`,
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
