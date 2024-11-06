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

const Layout = () => {
  return (
    <>
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
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DeviceManagement />} />
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
