import { create } from "zustand";
import { toaster } from "../components/ui/toaster";
import axios from "axios";
const useVendorStore = create((set) => ({
  allVendors: [],
  isLoading: false,
  btnLoading: false,
  fetchVendors: async (projectId) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        `http://103.127.29.215/api/project/${projectId}/all-vendors`
      );

      set({ allVendors: response.data.vendors || [] });
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
      toaster.create({
        type: "error",
        title: "Error Fetching Vendors",
        duration: 5000,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  addVendor: async (vendorName, projectId) => {
    if (vendorName.trim().length === 0) {
      toaster.create({
        type: "error",
        title: "Provide Valid Values",
        duration: 5000,
      });
    } else {
      set({ btnLoading: true });
      try {
        const response = await axios.post(
          `http://103.127.29.215/api/project/${projectId}/create-vendor`,
          { vendorName }
        );
        set((state) => ({
          allVendors: [...state.allVendors, response.data.newVendor],
        }));
        toaster.create({
          title: "Vendor Added Successfully",
          type: "success",
          duration: 5000,
        });
      } catch (error) {
        console.error("Failed to add Vendor:", error);
      } finally {
        set({ btnLoading: false });
      }
    }
  },
}));
export default useVendorStore;
