import {
  DataGrid,
  viVN,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { UserContext } from "../../../../context/UserContext";
import ListIcon from "@mui/icons-material/List";
import { Oval } from "react-loader-spinner";
import ScrollToTopButton from "../../../input/ScrollToTopButton";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useHistory } from "react-router-dom";
import { fetchAllCategories } from "../../../../services/categoryService";
import { SortCategoryIdById } from "../SortCategory";
import { columnsIndex, columnDepartmentName } from "../../../input/Column";
const IndexDepartment = () => {
  const { minorStatCount } = useContext(UserContext);
  const [pageSize, setPageSize] = useState(10);
  const [listCategories, setListCategories] = useState([]);
  const categoryId = localStorage.getItem("categoryId");
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  useEffect(() => {
    fetchCategories();
  }, [minorStatCount]);
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      let res = await fetchAllCategories();
      if (res.data.categories) {
        let categoryData = res.data.categories;
        // Sắp xếp lại mảng categoryData theo thứ tự ID đã chỉ định
        await SortCategoryIdById(categoryData);
        setListCategories(categoryData);
        setIsLoading(false);
        if (minorStatCount.length > 0) {
          // Tạo mảng mới với trường countMinorStat
          const resultData = res.data.categories.map((item1) => {
            // Tìm kiếm thông tin từ mảng thứ hai dựa trên "categoryId"
            const correspondingItem2 = minorStatCount.find(
              (item2) => item2.categoryId === item1.id
            );

            // Kết hợp thông tin từ cả hai mảng (nếu tìm thấy)
            if (correspondingItem2) {
              return {
                ...item1, // Copy thông tin từ data1
                countMinorStat: correspondingItem2.minorStatCount,
              };
            } else {
              // Nếu không có trùng khớp, thêm trường countMinorStat với giá trị mặc định là 0
              return {
                ...item1,
                countMinorStat: 0,
              };
            }
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleIndex = (id) => {
    history.push(`/department-index/${id}`);
  };
  const handleViewChartAllDepartmentByYear = () => {
    history.push(`/all-department-index-revision-by-year`);
  };
  const handleViewChartAllDepartmentByYearSpan = () => {
    history.push(`/all-department-index-revision-by-year-span`);
  };
  const handleViewAllMinorStat = () => {
    history.push(`/all-minor-stat`);
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

  const columnMinorStatCountAndUnapprovedMinorStatManifestCount = [
    {
      field: "unapprovedMinorStatManifestCount",
      headerName: "Phiên bản chưa duyệt",
      align: "center",
      headerAlign: "center",
      disableExport: true,
      minWidth: 180,
      renderCell: ({ row }) => {
        const { unapprovedMinorStatManifestCount } = row;
        const cellStyle = {
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          borderRadius: "4px",
        };
        const textStyle = {
          fontSize: "12px",
        };
        const resultColor =
          unapprovedMinorStatManifestCount > 0 ? "#adb5bd" : "none";
        return (
          <Box style={{ ...cellStyle, backgroundColor: resultColor }}>
            <Typography style={textStyle}>
              <span className="me-1">
                {unapprovedMinorStatManifestCount > 0 ? (
                  <ErrorOutlineIcon />
                ) : (
                  ""
                )}
              </span>{" "}
              {unapprovedMinorStatManifestCount}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const columnViewMinorStat = [
    {
      field: "Chỉ số",
      headerName: "Chỉ số",
      sortable: false, // Tắt sắp xếp cho cột "Thao tác"
      filterable: false, // Tắt lọc cho cột "Thao tác"
      disableExport: true,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => handleIndex(params.row.id)}
              variant="contained"
              title="Danh sách chỉ số"
              className="btn btn-primary"
            >
              {categoryId == 1 || categoryId == params.row?.id ? (
                <>
                  <ListIcon /> {params.row.minorStatCount}
                </>
              ) : (
                <ListIcon />
              )}
            </button>
          </>
        );
      },
    },
  ];
  const columns = [
    ...columnsIndex,
    ...columnDepartmentName,
    ...columnViewMinorStat,
  ];
  const columnsAd = [
    ...columnsIndex,
    ...columnDepartmentName,
    ...columnMinorStatCountAndUnapprovedMinorStatManifestCount,
    ...columnViewMinorStat,
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          printOptions={{ disableToolbarButton: true }}
          csvOptions={{
            fileName: `Danh sách khoa/ phòng`,
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }
  return (
    <>
      {!isLoading && (
        <>
          <div className="h1 text-center text-primary m-3 px-md-5 px-3">
            Danh sách khoa/ phòng
          </div>
          <div className="container mb-3">
            <div className=" mb-2 d-flex justify-content-start gap-4">
              {" "}
              <span>
                <Button
                  variant="outlined"
                  onClick={() => handleViewAllMinorStat()}
                >
                  Xem tất cả chỉ số
                </Button>
              </span>{" "}
              <span>
                <Button
                  variant="outlined"
                  onClick={() => handleViewChartAllDepartmentByYear()}
                >
                  Xem chỉ số trong một năm
                </Button>
              </span>{" "}
              <span>
                <Button
                  variant="outlined"
                  onClick={() => handleViewChartAllDepartmentByYearSpan()}
                >
                  Xem chỉ số trong nhiều năm
                </Button>
              </span>
            </div>
            <Box style={{ height: 600, width: "100%" }}>
              {listCategories.length > 0 ? (
                <DataGrid
                  rows={listCategories.map((row, index) => ({
                    ...row,
                    stt: index + 1,
                  }))}
                  columns={categoryId == 1 ? columnsAd : columns}
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
                  Hiện tại chưa có khoa/ phòng. Vui lòng thêm mới!
                </div>
              )}
            </Box>{" "}
            <ScrollToTopButton />
          </div>
        </>
      )}
    </>
  );
};
export default IndexDepartment;
