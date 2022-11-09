import {useState} from "react"
import storage from "./firebase.js"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
 
function App() {
    const [file, setFile] = useState("");
    // progress
    const [percent, setPercent] = useState(0);
 
    // Handles input change event and updates state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
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
        ); 
    }
 
    return (
        <div>
            <input type="file" onChange={handleChange}/>
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p>
        </div>
    );
}
 
export default App;