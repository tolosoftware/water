import React, {useState, useEffect} from 'react';
import {useDropzone} from "react-dropzone";
import axios from 'axios';


// start code for dropzone
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 165,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: '100%',
    height: '100%'
  };
  // end code for dropzone
export default function CustomDropzone(props) {
const [files, setFiles] = useState([]);
const [oldImage, setOldImage] = useState("");
 // dropzone code
    
 const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt={file.name}
             src={file.preview}
             style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="dropzone-card">
        <div className="dropzone">
            <div {...getRootProps({className: 'dropzone-file-btn'})}>
                <input {...getInputProps()} />
                <p>Upload image</p>
            </div>
        </div>
        <div className="dropzone-content" style={thumbsContainer}>
            {thumbs}
            {(files.length === 0 )? ((oldImage!=="" && oldImage!==undefined)? (<spam>
            <span className={`sp_right_padding`}>Cuurent Image </span>
            <span><img src={`${axios.defaults.baseURL}brand/pumpbrand/pump_list/${oldImage}`} class="img-thumbnail rounded edit_img_width"  alt="Responsive"></img></span>
            </spam>): ''): ''}
        </div>
    </div>
  );
}