import React, { Component } from "react";

class test extends Component {
    state = {
        // Initially, no file is selected
        selectedFile: null,
    };

    // On file select (from the pop up)
    onFileChange = (event) => {
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        const file = {
            title: "hello",
            name: "bye",
        };

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        for (const key in file) {
            formData.append(key, file[key]);
        }

        // Details of the uploaded file
        //console.log(this.state.selectedFile);

        for (var key of formData.keys()) {
            console.log(key, formData.get(key));
        }
        // Request made to the backend api
        // Send formData object
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {this.state.selectedFile.name}</p>

                    <p>File Type: {this.state.selectedFile.type}</p>

                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <h1>GeeksforGeeks</h1>
                <h3>File Upload using React!</h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>Upload!</button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default test;
