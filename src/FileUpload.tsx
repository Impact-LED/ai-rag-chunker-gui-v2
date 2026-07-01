import { useState, type ChangeEvent } from "react";
import './FileUpload.css';

type FileUploadProps = {
    recordType: string,
    displayName: string,
    onFileSelected: (payload: {recordType: string, file: File}) => void
}

function FileUpload({ recordType, displayName, onFileSelected }: FileUploadProps) {

    const [fileName, setFileName] = useState("");
    const [filesize, setFileSize] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if(!file) {
        setFileName("");
        setFileSize("");
        return;
    }
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
    onFileSelected({recordType, file});
  }
  
  function formatFileSize(bytes: number): string {
    if(bytes === 0) {
        return "0 bytes";
    }
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const base = 1024;
    const index = Math.floor(Math.log(bytes) / Math.log(base));
    const size = bytes / Math.pow(base, index);
    return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
  }

    return (
        <>
        <section className="file-upload-container">
            <label className="fileLabel" htmlFor={recordType}>
                {displayName}
                <input className="fileInput" onChange={handleChange} id={recordType} type="file" accept="application/json" />
            </label>
            <output>{fileName ? `📂 ${fileName} - ${filesize}` : ""}</output>
        </section>
        </>
    )
}

export default FileUpload;