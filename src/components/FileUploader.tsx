import { PropsWithChildren, useState } from "react";

const FileUploader = (
  props: PropsWithChildren<{ onFileUpload: (file: any) => void }>
) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      props.onFileUpload(file);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`file-uploader ${isDragging ? "dragging" : ""} center`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
      onClick={() =>
        (
          document?.querySelector(
            '.file-uploader input[type="file"]'
          ) as Element & { click: () => void }
        )?.click()
      }
    >
      <br />
      <p>Click here to select file to upload</p>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            props.onFileUpload(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default FileUploader;
