// ! CHILD class -- exported to `ProductForm.js`
import React from "react";
import Card from "../../card/Card";
import { AiOutlineCloudUpload } from "react-icons/ai";

const UploadWidget = () => {
  const addImages = () => {};

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
      </Card>
    </div>
  );
};

export default UploadWidget;
