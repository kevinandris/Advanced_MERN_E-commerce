// ! CHILD class -- exported to `ProductForm.js`
import React, { useState } from "react";
import Card from "../../card/Card";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const UploadWidget = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // ! This function is passed on `input field` at `onChange` property.
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

  return (
    <div>
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

        {/* // ! View Selected Images */}
        <div className={selectedImages.length > 0 ? "images" : ""}>
          {selectedImages !== 0 &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className="image">
                  <img src={image} alt="productImage" width={200} />
                  <button className="-btn">
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
