import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import $ from "jquery";

export default function AllImages() {
  const [allFetchedImages, setAllFetchedImages] = useState("");
  let interval = $(".interval");
  const allImages = async () => {
    const url = "/api/v1/all/images";
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const res = await data.json();
    console.log(res.images);
    setAllFetchedImages(res.images);
  };
  const DelImg = async (id) => {
    toast.info("Deleting", {
      position: "bottom-right",
    });
    const url = "/api/v1/delete/img/" + id;
    const data = await fetch(url, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const res = await data.json();
    if (res.success === true) {
      toast.success(res.message, {
        position: "bottom-right",
      });
    }
    console.log(res);
    allImages();
    interval.removeClass("d-none");
  };
  useEffect(() => {
    allImages();
    interval.addClass("d-none");
    setTimeout(() => {
      interval.removeClass("d-none");
    }, 500);
  }, []);
  return (
    <>
      <h2>All Uploaded Images</h2>
      <div className="img-gallery mt-3">
        <div className="row">
          {allFetchedImages ? (
            allFetchedImages.map((curElem, index) => {
              let i = curElem.img[0];
              return (
                <div className="col-lg-3" key={index}>
                  <div className="card">
                    <div className="card-img">
                      <img src={i.path} alt={i.name} width="100%" />
                    </div>
                    <div className="card-body">
                      <h4>{i.name}</h4>
                      <i
                        className="fas fa-trash"
                        onClick={() => DelImg(curElem._id)}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <Loader />
          )}
          {!allFetchedImages.length && (
            <p className="interval">No Images Found</p>
          )}
        </div>
      </div>
      <Link to="/upload-img">Upload new Image</Link>
    </>
  );
}
