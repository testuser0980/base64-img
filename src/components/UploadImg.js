import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadImg() {
  const [fileinfo, setFileInfo] = useState("");
  const [fileName, setFileName] = useState("");

  const getFileInfoHandler = (e) => {
    let files = e.target.files[0];
    let FileName = e.target.files[0].name;
    let reader = new FileReader();
    reader.onload = () => {
      setFileInfo(reader.result);
    };
    reader.readAsDataURL(files);
    setFileName(FileName);
  };

  const postImg = async () => {
    toast.info("File Uploading", {
      position: "bottom-right",
    });
    const url = "/api/v1/upload/img";
    // console.log(fileinfo, fileName);
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: fileName, path: fileinfo }),
    });
    const res = await data.json();
    if (res.success === true) {
      toast.success("File successfully uploaded", {
        position: "bottom-right",
      });
    }
    console.log(res);
  };
  return (
    <>
      <div className="form-group">
        <input
          type="file"
          onChange={getFileInfoHandler}
          name=""
          className="form-control"
          id=""
        />
        <button
          onClick={() => postImg()}
          className="btn btn-sm btn-primary mt-2"
        >
          Upload
        </button>
      </div>
      <Link to="/">Go back to check All Uploaded Images</Link>
    </>
  );
}
