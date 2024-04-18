// ! CHILD class -- exported to `ProductForm.js`
import React, { useState } from "react";
import Card from "../../card/Card";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = "https://api.cloudinary.com/v1_1/keipy/image/upload";
const UploadWidget = ({ files, setFiles }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // ! This function is passed on `input field at onChange property`.
  const addImages = (e) => {
    const selectedFiles = e.target.files;

    /* >>> Fetched and stored all the files in this variable. */
    const selectedFilesArray = Array.from(selectedFiles);

    /* >>> Convert the selected images array into a URL. */
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    /* >>> This would be sent to cloudinary. */
    setImages((prevImages) => prevImages.concat(selectedFilesArray));

    /* >>> Concat the images to the state -- this is used to display on the browser. */
    setSelectedImages((prevImages) => prevImages.concat(imagesArray));

    e.target.value = "";
  };

  // ! This function is passed as a prop on the `button attribute of onClick`
  const removeImage = (image) => {
    const imageIndex = selectedImages.indexOf(image);
    setSelectedImages(selectedImages.filter((img) => img !== image));
    setImages(images.filter((img, index) => index !== imageIndex));
    URL.revokeObjectURL(image);
  };

  // ! This function is passed as a prop on the `button attribute of onClick`
  const uploadImages = () => {
    // console.log(images);
    setUploading(true);

    /* >>> all image URL will pushed to this variable */
    let imageURLs = [];

    /* >>> Upload to cloudinary */
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append("file", file);
      formData.append("upload_preset", upload_preset);
      formData.append("folder", "keipy");

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          imageURLs.push(data.secure_url);
          setProgress(imageURLs.length);

          if (imageURLs.length === images.length) {
            setFiles((prevFiles) => prevFiles.concat(imageURLs));
            setUploading(false);
            console.log(files);

            /* >>> After the process of uploading the image*/
            toast.success("Image upload completed.");
            setImages([]);
            setSelectedImages([]);
            setProgress(0);
          }
        })
        .catch((error) => {
          setUploading(false);
          toast.error(error.message);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Toaster />
      <Card cardClass={"formcard group"}>
        <label className="uploadWidget">
          <AiOutlineCloudUpload size={35} />
          <br />
          <span>Click to upload up to 5 images</span>
          <input
            type="file"
            name="images"
            onChange={addImages}
            multiple
            accept="image/png, image/jpeg, image/webp"
          />
        </label>
        <br />

        {/* // ! >>> Logic to prevent the user uploading more than 5 images */}
        {selectedImages.length > 0 &&
          (selectedImages.length > 5 ? (
            <p className="error">
              You can't upload more than 5 images!
              <br />
              <span>
                Please remove <b>{selectedImages.length - 5} </b>of them
              </span>
            </p>
          ) : (
            <div className="--center-all">
              <button
                className="--btn --btn-danger --btn-large"
                disabled={uploading}
                onClick={() => uploadImages()}
              >
                {uploading
                  ? `Uploading ${progress} of ${images.length}`
                  : `Upload ${images.length} image(s)`}
              </button>
            </div>
          ))}

        {/* // ! >>> View Selected Images */}
        <div className={selectedImages.length > 0 ? "images" : ""}>
          {selectedImages !== 0 &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className="image">
                  <img src={image} alt="productImage" width={200} />
                  <button className="-btn" onClick={() => removeImage(image)}>
                    <BsTrash size={25} />
                  </button>
                  <p>{index + 1}</p>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};

export default UploadWidget;
