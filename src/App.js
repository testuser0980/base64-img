import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UploadImg from "./components/UploadImg";
import AllImages from "./components/AllImages";

function App() {
  return (
    <>
      <Router>
        <div className="container py-5">
          <Routes>
            <Route path="/upload-img" element={<UploadImg />}></Route>
            <Route path="/" element={<AllImages />}></Route>
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
