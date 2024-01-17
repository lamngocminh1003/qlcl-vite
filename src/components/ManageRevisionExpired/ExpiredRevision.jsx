import { useEffect, useState } from "react";
import { fetchRevisionExpiredByFolderIdService } from "../../services/revisionService";
import ModalEditRevision from "./ModalEditRevision";
import ModalDeleteRevision from "./ModalDeleteRevision";
import ModalAddRevision from "../ManageRevisionActive/ModalAddRevision";
import { useHistory } from "react-router-dom";
import { getFolderInfoByFolderIdService } from "../../services/folderService";
import { closeRevision } from "../../services/fileService";
import _ from "lodash";
import { format } from "date-fns"; // Import thư viện định dạng ngày tháng
import { Oval } from "react-loader-spinner";
import ScrollToTopButton from "../input/ScrollToTopButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  viVN,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskIcon from "@mui/icons-material/Task";
const RevisionExpired = (props) => {
  const [pageSize, setPageSize] = useState(10);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [folderId, setFolderId] = useState("");
  const [folderName, setFolderName] = useState("");
  const [dataRevision, setDataRevision] = useState([]);
  const [listRevisions, setListRevisions] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  useEffect(() => {
    fetchRevisionExpiredRevisionByFolderId(folderId, categoryId);
    getFolderInfoByFolderId(folderId, categoryId);
  }, [folderId]);
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      let params = props.match.params.id.split("_");
      let id = params[0];
      let categoryId = +params[1];
      setFolderId(id);
      setCategoryId(categoryId);
    }
  }, []);
  const getFolderInfoByFolderId = async (folderId, categoryId) => {
    let res = await getFolderInfoByFolderIdService(folderId, categoryId);
    if (res) {
      setCategoryId(res.data.categoryId);
      setFolderName(res.data.folderName);
    }
  };
  const fetchRevisionExpiredRevisionByFolderId = async (
    folderId,
    categoryId
  ) => {
    setIsLoading(true);
    let res = await fetchRevisionExpiredByFolderIdService(folderId, categoryId);
    if (res) {
      setListRevisions(res?.data?.revisions);
      setIsLoading(false);
    }
  };
  const handleViewFileByRevisionExpired = (revisionExpired) => {
    history.push(
      `/file-revision-expired/${revisionExpired.id}_${folderId}_${categoryId}`
    );
  };
  const handleBack = () => {
    history.push(`/category-folder/${categoryId}`);
  };
  const handleEditTable = (revisionExpired) => {
    fetchRevisionExpiredRevisionByFolderId(folderId, categoryId);
  };
  const handleEditRevision = (revisionExpired) => {
    setShowEdit(true);
    setDataRevision(revisionExpired);
  };
  const handleDeleteRevision = (revisionExpired) => {
    setShowDelete(true);
    setDataRevision(revisionExpired);
  };
  const handleDeleteFromModal = (revisionExpired) => {
    fetchRevisionExpiredRevisionByFolderId(folderId, categoryId);
  };
  const handleCloseCommit = async (revisionExpired) => {
    let res = await closeRevision(revisionExpired.id);
    if (res) {
      history.push(`/revision-active/${folderId}_${categoryId}`);
    }
  };
  const columns = [
    {
      field: "stt",
      headerName: "STT",
      valueGetter: (params) => params.row.stt,
      width: 50,
    },
    {
      field: "revisionNumber",
      headerName: "Lần soát xét",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "activation",
      headerName: "Ngày hiệu lực",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => {
        const originalDate = params.value; // Lấy giá trị ngày từ dữ liệu
        if (originalDate) {
          const formattedDate = format(new Date(originalDate), "dd/MM/yyyy");
          return formattedDate; // Trả về ngày đã định dạng
        }
        return ""; // Hoặc giá trị mặc định khi không có ngày
      },
    },
    {
      field: "note",
      headerName: "Ghi chú",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Tài liệu",
      headerName: "Tài liệu",
      disableExport: true,
      sortable: false, // Tắt sắp xếp cho cột "Thao tác"
      filterable: false, // Tắt lọc cho cột "Thao tác"
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => handleViewFileByRevisionExpired(params.row)}
              variant="contained"
              title="Tài liệu"
              className="btn btn-primary"
            >
              <DescriptionIcon />
            </button>
          </>
        );
      },
    },
  ];
  const columns2 = [
    ...columns,

    {
      field: "Sửa",
      headerName: "Sửa",
      disableExport: true,
      sortable: false, // Tắt sắp xếp cho cột "Thao tác"
      filterable: false, // Tắt lọc cho cột "Thao tác"
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => handleEditRevision(params.row)}
              variant="contained"
              title="Sửa phiên bản"
              className="btn btn-warning"
            >
              <EditIcon />
            </button>
          </>
        );
      },
    },
    {
      field: "Xóa",
      headerName: "Xóa",
      disableExport: true,
      sortable: false, // Tắt sắp xếp cho cột "Thao tác"
      filterable: false, // Tắt lọc cho cột "Thao tác"
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => handleDeleteRevision(params.row)}
              variant="contained"
              title="Xóa phiên bản"
              className="btn btn-danger"
            >
              <DeleteIcon />
            </button>
          </>
        );
      },
    },
    {
      field: "Lấy phiên bản hiệu lực",
      headerName: "Lấy phiên bản hiệu lực",
      sortable: false, // Tắt sắp xếp cho cột "Thao tác"
      filterable: false, // Tắt lọc cho cột "Thao tác"
      disableExport: true,
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => handleCloseCommit(params.row)}
              variant="contained"
              title="Lấy phiên bản hiệu lực"
              className="btn btn-success"
            >
              <TaskIcon />
            </button>
          </>
        );
      },
    },
  ];
  if (isLoading) {
    return (
      <div className="loading">
        {" "}
        <Oval
          height={80}
          width={80}
          color="#51e5ff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#429ea6"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <div className="text">Loading....</div>
      </div>
    );
  }
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          printOptions={{ disableToolbarButton: true }}
          csvOptions={{
            fileName: `Quản lý phiên bản hết hiệu lực của quy trình ${folderName}`,
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }
  const handleUpdateTable = () => {
    fetchRevisionExpiredRevisionByFolderId(folderId, categoryId);
  };
  return (
    <>
      <ModalEditRevision
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        dataRevision={dataRevision}
        handleEditTable={handleEditTable}
      />
      <ModalDeleteRevision
        setShowDelete={setShowDelete}
        showDelete={showDelete}
        dataRevision={dataRevision}
        handleDeleteFromModal={handleDeleteFromModal}
      />
      <div className="revisionExpired-header">
        <div className="h1 text-center text-primary m-3 px-md-5 px-3">
          Quản lý phiên bản hết hiệu lực của quy trình
          <span className="text-lowercase text-warning ms-1">{folderName}</span>
        </div>
        <div className="container">
          <div className="d-flex gap-3"></div>
          <div className="row">
            <div>
              <span>
                <button className="btn btn-info" onClick={() => handleBack()}>
                  <span>
                    <i className="fa-solid fa-rotate-left me-1"></i>
                  </span>
                  <span>Trở về</span>
                </button>
              </span>{" "}
              <span>
                <ModalAddRevision
                  handleUpdateTable={handleUpdateTable}
                  fetchActiveRevisionByFolderId={
                    fetchRevisionExpiredRevisionByFolderId
                  }
                  listRevisions={listRevisions}
                  folderId={folderId}
                  categoryId={categoryId}
                />
              </span>
            </div>
            <Box style={{ height: 600, width: "100%" }} className="my-3">
              {listRevisions.length > 0 ? (
                <DataGrid
                  rows={listRevisions.map((row, index) => ({
                    ...row,
                    stt: index + 1,
                  }))}
                  columns={columns2}
                  components={{ Toolbar: CustomToolbar }}
                  localeText={
                    viVN.components.MuiDataGrid.defaultProps.localeText
                  }
                  checkboxSelection
                  disableRowSelectionOnClick
                  pagination={true}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100]}
                />
              ) : (
                <div className="h6 text-center text-secondary m-3">
                  Hiện tại chưa có phiên bản hết hạn
                </div>
              )}
            </Box>
          </div>
          <ScrollToTopButton />
        </div>
      </div>
    </>
  );
};
export default RevisionExpired;