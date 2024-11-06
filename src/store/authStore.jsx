import { create } from "zustand";
import { persist } from "zustand/middleware";

import axios from "axios";
import { toaster } from "../components/ui/toaster";
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post("http://103.127.29.215/api/login", {
            username,
            password,
          });
          const { token, user } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // Set token for axios interceptor
          localStorage.setItem("token", token);
          toaster.create({
            title: "Logged In Successfully",
            type: "success",
            duration: 3500,
          });
          return true;
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.response?.data?.message || "Login failed",
          });
          console.log(error.response.data.message);
          toaster.create({
            title:
              error.response.data.message || "Error occured while logging in",
            type: "error",
            duration: 3500,
          });
          return false;
        }
      },

      register: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            "http://103.127.29.215/auth/register",
            {
              username,
              password,
            }
          );
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Registration failed",
          });
          return false;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
