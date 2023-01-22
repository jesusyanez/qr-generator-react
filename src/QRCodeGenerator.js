import React, { useState } from "react";
import axios from "axios";

function QRCodeGenerator() {
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://qr-generator-node.vercel.app/api/codes/qr?url=${url}`,
        {
          responseType: "arraybuffer",
        }
      );
      const base64 = btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setQrImage(`data:image/svg+xml;base64,${base64}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button type="submit">Generate QR Code</button>
      </form>
      {qrImage && <img src={qrImage} alt="QR Code" />}
      {qrImage && (
        <div>
          <a
            href={`https://qr-generator-node.vercel.app/api/codes/qrdl?url=${url}`}
          >
            <h3>Download PNG</h3>
          </a>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
