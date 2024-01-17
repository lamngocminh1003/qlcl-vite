import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { TextField, Box, Autocomplete } from "@mui/material";
import { folderReference } from "../../services/folderService";
import CopyAllIcon from "@mui/icons-material/CopyAll";
const ModalAddFolderReference = (props) => {
  let { fetchFoldersByCategoryId, idCategory, sortOption, categoryData } =
    props;

  const [isShowLoading, setIsShowLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [value, setValue] = useState(categoryData[0]);
  const [inputValue, setInputValue] = useState("");
  const [categorySelect, setCategorySelect] = useState(
    categoryData[0]?.categoryId
  );
  const [folderSelect, setFolderSelect] = useState(categoryData[0]?.id);
  const handleClose = () => {
    setShow(false);
    setFolderId("");
    setFolderName("");
  };
  const handleShow = () => setShow(true);
  const handleOnClickAdd = async () => {
    try {
      setIsShowLoading(true);
      let res = await folderReference(idCategory, folderSelect);
      if (res) {
        //success
        setShow(false);
        setFolderName("");
        setFolderId("");
        toast.success("Tham chiếu quy trình thành công!");
        fetchFoldersByCategoryId(idCategory, sortOption);
      } else {
        toast.error(`${res.data}`);
      }
      setIsShowLoading(false);
    } catch (error) {
      toast.error("Tham chiếu quy trình thất bại!");
      setIsShowLoading(false);
    }
  };
  return (
    <>
      <Button
        variant="warning"
        className="mb-3"
        onClick={handleShow}
        title="Tham chiếu quy trình từ thư mục khác"
      >
        <span>
          <CopyAllIcon />
        </span>
        Tham chiếu
      </Button>

      <Modal backdrop="static" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6 text-uppercase text-primary">
            Tham chiếu quy trình từ thư mục khác
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Autocomplete
            sx={{ gridColumn: "span 12", minWidth: 120 }}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              const selectedCategory = categoryData.find(
                (option) => option?.folderName === newValue?.folderName
              );
              if (selectedCategory) {
                const categoryId = selectedCategory?.categoryId;
                const folderId = selectedCategory?.id;
                setCategorySelect(categoryId);
                setFolderSelect(folderId);
              }
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={categoryData}
            getOptionLabel={(option) => option.folderName}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.folderName}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Quy trình"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => handleOnClickAdd()}>
            {isShowLoading && (
              <i className="fas fa-spinner fa-pulse me-2 text-white"></i>
            )}
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalAddFolderReference;
