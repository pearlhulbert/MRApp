import ReactDOM from "react-dom/client";
import React from 'react';
import '../App.css';
import {storage} from "../firebase.js"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: "",
            setFile: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }
    //const [file, setFile] = useState("");
    // progress
    //const [percent, setPercent] = useState(0);
 
    // Handles input change event and updates state
    handleChange(event) {
        this.setState({setFile: event.target.files[0]});
    }

    handleUpload() {
        if (!this.state.file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(storage, `/files/${this.state.file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, this.state.file);

        /*uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
     
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        ); */
    }
    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange}/>
                <button onClick={this.handleUpload}>Upload to Firebase</button>
            </div>
        );
    }
    
}

export default FileUpload;