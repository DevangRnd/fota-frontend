import { create } from "zustand";
import axios from "axios"; // Assuming you'll use axios for API calls
import { toaster } from "../components/ui/toaster";
const useProjectStore = create((set) => ({
  allProjects: [],
  isLoading: true,
  btnLoading: false,
  // Fetch all projects from the server
  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(
        "http://103.127.29.215/api/get-projects"
      ); // Replace with your API endpoint
      set({ allProjects: response.data.projects || [] });
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toaster.create({
        type: "error",
        title: "Error Fetching Projects",
        duration: 5000,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Add a new project to the store and optionally the server
  addProject: async (name) => {
    if (name.trim().length === 0) {
      toaster.create({
        type: "error",
        title: "Provide Valid Values",
        duration: 5000,
      });
    } else {
      set({ btnLoading: true });
      try {
        const response = await axios.post(
          "http://103.127.29.215/api/create-project",
          { name }
        ); // Replace with your API endpoint
        set((state) => ({
          allProjects: [...state.allProjects, response.data.newProject],
        }));
        toaster.create({
          title: "Project Added Successfully",
          type: "success",
          duration: 5000,
        });
      } catch (error) {
        console.error("Failed to add project:", error);
      } finally {
        set({ btnLoading: false });
      }
    }
  },
}));

export default useProjectStore;
