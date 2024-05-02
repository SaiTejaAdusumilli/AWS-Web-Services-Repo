import React, { useState } from 'react';
import AWS from 'aws-sdk';

function FileUploadComponent() {
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState(null);

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if(selectedFile?.type ==="text/plain"){
    setFile(selectedFile);
    }
    else{
        const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
        alert("only txt files")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Text Input:', textInput);
    console.log('File:', file);

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY
    });

    const s3 = new AWS.S3();

    try {
      
      if (file) {
        const params = {
          Bucket: process.env.REACT_APP_BUCKET,
          Key: file.name,
          Body: file,
        };
        await s3.upload(params).promise();
      }
      console.log("uploaded!!");
      const api = process.env.REACT_APP_API_GATEWAY;
      const path = `${process.env.REACT_APP_BUCKET}/${file.name}`
      const url = `${api}?path=${path}&text=${textInput}`
      console.log("path: ",path,"url: ",url)
      const response = await fetch(url);
      console.log("responseeeeee",response)

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log('Response from API endpoint:', data);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
      setTextInput('');
      setFile(null);
    }
    catch (error) {
      console.error('Error uploading file/text to S3:', error);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Text Input:
          <input
            type="text"
            value={textInput}
            onChange={handleTextChange}
            required={true}
          />
        </label>
        <br />

        <label>
          Text File Upload:
          <input
            type="file"
            onChange={handleFileChange}
            required={true}
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FileUploadComponent;
