import { useState, type SubmitEvent } from "react";
import './App.css'
import FileUpload from './FileUpload'
const endpoint_url = import.meta.env.ENDPOINT_URL;

function App() {
  const [ticketFile, setTicketFile] = useState<File | null>(null);
  const [commentFile, setCommentFile] = useState<File | null>(null);
  const [env, setEnv] = useState('prod');

  const onFileSelected = (payload: {recordType: string, file: File}) => {
    if(payload.recordType == 'ticket') {
      setTicketFile(payload.file);
    }
    if(payload.recordType == 'comment') {
      setCommentFile(payload.file);
    }
  }

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ticketFile || !commentFile) {
      return;
    }
    const formData = new FormData();
    formData.append("env", env);
    formData.append("tickets", ticketFile);
    formData.append("comments", commentFile);

    const response = await fetch(endpoint_url, {
      method: "POST",
      body: formData
    })

    console.log("Response:", response);
  }


  return (
    <>
      <section className='main'>
        <h1>Upload iGo Ticket and Comment Data</h1>
        <form onSubmit={evt => onSubmit(evt)} className='fileForm'>
          <div className='inputs'>
              <FileUpload onFileSelected={onFileSelected}  recordType='ticket' displayName='Tickets 🎟️' />
              <FileUpload onFileSelected={onFileSelected} recordType='comment' displayName='Comments and Attachments 💬' />
          </div>
          <hr style={{width: '100%'}}></hr>
          <div className="submission">
            <label htmlFor="env">
              <span>Environment:</span>
              <select id="env" value={env} onChange={(event) => setEnv(event.target.value)}>
                <option value="prod">Production</option>
                <option value="dev">Development</option>
                <option value="stage">Stage</option>
            </select>
            </label>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default App
