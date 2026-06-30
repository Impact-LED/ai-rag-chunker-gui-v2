import { useState, type ChangeEvent } from "react";
import './FileUpload.css';

type FileUploadProps = {
    recordType: string,
    displayName: string,
    onFileSelected: (payload: {recordType: string, file: File}) => void
}

function FileUpload({ recordType, displayName, onFileSelected }: FileUploadProps) {

    const [fileName, setFileName] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if(!file) {
        setFileName("");
        return;
    }
    setFileName(file.name);
    onFileSelected({recordType, file});
  }  

    return (
        <>
        <section className="file-upload-container">
            <label className="fileLabel" htmlFor={recordType}>
                {displayName}
                <input className="fileInput" onChange={handleChange} id={recordType} type="file" accept="application/json" />
            </label>
            <p>{fileName ? '📂 ' + fileName : ""}</p>
        </section>
        </>
    )
}

export default FileUpload;