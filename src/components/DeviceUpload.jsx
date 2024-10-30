import { useState } from "react";

const DeviceUpload = () => {
  const [deviceIds, setDeviceIds] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://fota-backend.onrender.com/api/add-device",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deviceId: deviceIds.split(",").map((id) => id.trim()),
          }),
        }
      );
      const data = await response.json();
      setMessage({
        text: data.message,
        type: response.ok ? "success" : "error",
      });
      setDeviceIds("");
    } catch (error) {
      console.log(error);
      setMessage({ text: "Failed to upload devices", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Devices</h1>
      {message && (
        <div
          className={`alert ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Device IDs (comma separated)"
          value={deviceIds}
          onChange={(e) => setDeviceIds(e.target.value)}
          className="border-2 border-blue-400 rounded-md py-2 px-3"
        />
        {loading ? (
          <button
            disabled
            className="py-2 px-3 bg-gray-700 ml-4 rounded-md text-white"
          >
            Adding
          </button>
        ) : (
          <button
            type="submit"
            className="py-2 px-3 bg-green-700 ml-4 rounded-md text-white"
          >
            Add Devices
          </button>
        )}
      </form>
    </div>
  );
};

export default DeviceUpload;
