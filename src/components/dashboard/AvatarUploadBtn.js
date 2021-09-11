import React, { useState } from "react";
import { Alert, Button, Modal } from "rsuite";
import { useModelState } from "../../misc/custom-hooks";
import AvatarEditor from "react-avatar-editor";
const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);
const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModelState();

  const [img, setImg] = useState(null);

  const onFileInputChange = (ev) => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-item-center h-100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
