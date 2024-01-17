import {
  DataGrid,
  viVN,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  DoNotDisturbOnOutlined,
  Edit,
  Delete,
  CalendarMonth,
} from "@mui/icons-material";
import * as React from "react";
import { Box } from "@mui/material";
import ModalEditDepartmentFromIndex from "../ManageIndexFromDepartment/ModalEditDepartmentFromIndex";
import ModalDeleteDepartmentFromIndex from "../ManageIndexFromDepartment/ModalDeleteDepartmentFromIndex";
import { Oval } from "react-loader-spinner";
import { fetchAllCategories } from "../../../../services/categoryService";
import ModalAddNewDepartmentFromIndex from "./ModalAddNewDepartmentFromIndex";
import ScrollToTopButton from "../../../input/ScrollToTopButton";
import { allMinorStatService } from "../../../../services/index/DepartmentStat/MinorStatService";
import { SortCategoryId, SortCategoryIdById } from "../SortCategory";
import { useHistory } from "react-router-dom";
import {
  columnsIndex,
  columnStatName,
  columnDepartment,
  columnUnit,
  columnUnapprovedManifestCount,
} from "../../../input/Column";
const IndexFromDepartment = (props) => {
  const [pageSize, setPageSize] = useState(10);
  const categoryId = localStorage.getItem("categoryId");
  const [showEdit, setShowEdit] = useState(false);
  const [dataIndex, setDataIndex] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [departmentId, setDepartmentId] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [listIndex, setListIndex] = useState([]);
  let history = useHistory();
  useEffect(() => {
    fetchListMinorStats();
    getCategoryByCategoryId();
  }, []);
  const getCategoryByCategoryId = async () => {
    let res = await fetchAllCategories();
    if (res && res.data.categories) {
      await SortCategoryIdById(res.data.categories);
      setCategoryData(res.data.categories);
    }
  }; // Hàm để ánh xạ categoryId sang categoryName
  const getCategoryNamesFromMinorStats = (stats, mappings) => {
    return stats?.map((stat) => {
      const category = mappings?.find((item) => item.id === stat.categoryId);
      return {
        ...stat,
        categoryName: category ? category.categoryName : "Unknown Category",
      };
    });
  };
  // Lấy thêm categoryName từ mảng "categoryMappings" dựa trên "categoryId" trong mảng "minorStats"
  const statsWithCategoryNames = getCategoryNamesFromMinorStats(
    listIndex,
    categoryData
  );
  const fetchListMinorStats = async () => {
    try {
      setIsLoading(true);
      let res = await allMinorStatService();
      if (res?.data?.minorStats) {
        await SortCategoryId(res?.data?.minorStats);
        setListIndex(res.data.minorStats);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleEdit = (params) => {
    // Xử lý sự kiện khi người dùng nhấn nút "Sửa"
    setShowEdit(true);
    setDataIndex(params.row);
  };
  const handleBack = () => {
    history.push(`/department-index`);
  };
  const handleDelete = (params) => {
    // Xử lý sự kiện khi người dùng nhấn nút "Xóa"
    setShowDelete(true);
    setDataIndex(params.row);
  };
  const handleRevision = (row) => {
    history.push(`/department-index-revision/${row.id}/${row?.categoryId}`);
  };
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
  const columnViewMinorDetail = [
    {
      field: "columnCountRepo",
      headerName: "Thời gian",
      sortable: false, // Tắt sắp xếp cho cột "Thao tác"
      filterable: false, // Tắt lọc cho cột "Thao tác"
      disableExport: true,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => handleRevision(params.row)}
              variant="contained"
              title="Thời gian của chỉ số"
              className="btn btn-primary"
            >
              {categoryId == 1 || categoryId == params.row?.categoryId ? (
                <>
                  <CalendarMonth />
                  &nbsp;{params?.row?.repositoryCount}
                </>
              ) : (
                <CalendarMonth />
              )}
            </button>
          </>
        );
      },
    },
  ];
  const columnDelete = [
    {
      field: "Xóa",
      disableExport: true,
      sortable: false, // Tắt sắp xếp cho cột "Thao tác"
      filterable: false, // Tắt lọc cho cột "Thao tác"
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => handleDelete(params)}
              variant="contained"
              title="Xóa khoa/ phòng"
              className="btn btn-danger"
            >
              <Delete />
            </button>
          </>
        );
      },
    },
  ];
  const columnEdit = [
    {
      field: "Sửa",
      headerName: "Sửa",
      disableExport: true,
      sortable: false, // Tắt sắp xếp cho cột "Thao tác"
      filterable: false, // Tắt lọc cho cột "Thao tác"
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        if (categoryId == params.row?.categoryId || categoryId == 1) {
          return (
            <>
              <button
                onClick={() => handleEdit(params)}
                variant="contained"
                title="Sửa khoa/ phòng"
                className="btn btn-warning"
              >
                <Edit />
              </button>
            </>
          );
        }
        return (
          <>
            <Box variant="contained" className="text-warning">
              <DoNotDisturbOnOutlined />
            </Box>
          </>
        );
      },
    },
  ];
  const columnAd = [
    ...columnsIndex,
    ...columnStatName,
    ...columnDepartment,
    ...columnUnit,
    ...columnUnapprovedManifestCount,
    ...columnViewMinorDetail,
    ...columnEdit,
    ...columnDelete,
  ];
  const columns = [
    ...columnsIndex,
    ...columnStatName,
    ...columnDepartment,
    ...columnUnit,
    ...columnViewMinorDetail,
    ...columnEdit,
  ];
  let selectedColumns;
  if (categoryId == 1) {
    selectedColumns = columnAd;
  } else {
    selectedColumns = columns;
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
            fileName: `Danh sách chỉ số khoa/ phòng`,
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <ModalEditDepartmentFromIndex
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        dataIndex={dataIndex}
        fetchListMinorStats={fetchListMinorStats}
        departmentId={departmentId}
      />
      <ModalDeleteDepartmentFromIndex
        setShowDelete={setShowDelete}
        showDelete={showDelete}
        dataIndex={dataIndex}
        fetchListMinorStats={fetchListMinorStats}
        departmentId={departmentId}
      />
      {!isLoading && (
        <>
          <div className="h1 text-center text-primary m-3 px-md-5 px-3">
            Danh sách tất cả chỉ số khoa/ phòng{" "}
          </div>
          <div className="container mb-3">
            <div className="d-flex gap-3 mb-3">
              {" "}
              <span>
                <button className="btn btn-info" onClick={() => handleBack()}>
                  <span>
                    <i className="fa-solid fa-rotate-left me-1"></i>
                  </span>
                  <span>Trở về</span>
                </button>
              </span>
              <span>
                <span>
                  <ModalAddNewDepartmentFromIndex
                    fetchListMinorStats={fetchListMinorStats}
                    departmentId={departmentId}
                    categoryData={categoryData}
                    categoryId={categoryId}
                  />
                </span>
              </span>
            </div>
            <Box style={{ height: 600 }}>
              {statsWithCategoryNames.length > 0 ? (
                <DataGrid
                  rows={statsWithCategoryNames.map((row, index) => ({
                    ...row,
                    stt: index + 1,
                  }))}
                  columns={selectedColumns}
                  components={{
                    Toolbar: CustomToolbar,
                  }}
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
                  Hiện tại chưa có chỉ số khoa/ phòng. Vui lòng thêm mới!
                </div>
              )}
            </Box>
            <ScrollToTopButton />
          </div>
        </>
      )}
    </>
  );
};
export default IndexFromDepartment;
