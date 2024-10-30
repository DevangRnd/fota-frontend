import { useState } from "react";

const FirmwareUpload = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear any previous message

    if (!name || !file) {
      return setMessage({
        text: "Please provide both firmware name and file",
        type: "error",
      });
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("firmware", file);

    try {
      const response = await fetch(
        "https://fota-backend.onrender.com/api/upload-firmware",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: "Firmware uploaded successfully.",
          type: "success",
        });
        setName("");
        setFile(null);
      } else {
        setMessage({
          text: data.error || "Failed to upload firmware",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
      setMessage({ text: "Failed to upload firmware", type: "error" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Upload Firmware</h1>
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
          placeholder="Firmware Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="input"
        />
        <button type="submit" className="btn btn-primary">
          Upload Firmware
        </button>
      </form>
    </div>
  );
};

export default FirmwareUpload;
