import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import FirmwareUpload from "./components/common/FirmwareUpload";
import Navbar from "./components/common/Navbar";
import DeviceManagement from "./components/common/DeviceManagement";
import UploadDevices from "./components/common/UploadDevices";
import LoginForm from "./components/common/LoginForm";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import PageProgress from "./components/common/PageProgress";
import ProjectPage from "./components/common/ProjectPage";
import VendorPage from "./components/common/VendorPage";

const MainLayout = () => {
  return (
    <>
      <PageProgress />
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProjectPage />} />
        <Route path="/:projectId/all-vendors" element={<VendorPage />} />
        <Route
          path="/vendor/:vendorId/devices"
          element={<DeviceManagement />}
        />
        <Route path="/firmware-upload" element={<FirmwareUpload />} />
        <Route path="/upload-devices" element={<UploadDevices />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
