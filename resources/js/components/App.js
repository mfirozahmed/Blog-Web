import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8 mt-5">
                    <div className="card">
                        <h2>This is react app2</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

if (document.getElementById("appx")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
