import { useState, useEffect } from "react";
import SearchAllRevisionByDate from "./SearchAllRevisionByDate";
import { useHistory } from "react-router-dom";
import ScrollToTopButton from "../../../input/ScrollToTopButton";
import { Oval } from "react-loader-spinner";
import { Button } from "@mui/material";
import { MinorStatDetailsByCategoryIdAndYearService } from "../../../../services/index/DepartmentStat/MinorStatDetailsService";
import ExportCSVDepartment from "../../../input/ExportCSVDepartment";
import Dashboard from "./AllDepartment/Chart";
import { SortCategoryId } from "../../Department/SortCategory";
import { buildData } from "../../Department/BuildData";
import { getCategoryById } from "../../../../services/categoryService";
const DashboardDepartmentIndexRevisionByYear = (props) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [listCascadeByYear, setListCascadeByYear] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [categoryData, setCategoryData] = useState("");
  let history = useHistory();
  const handleDepartmentRevision = (item) => {
    history.push(
      `/department-index-revision/${item.statId}/${item.categoryId}`
    );
  };
  const handleDepartment = (item) => {
    history.push(`/department-index/${item.categoryId}`);
  };
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      let id = props.match.params.id;
      setDepartmentId(id);
    }
  }, []);
  useEffect(() => {
    fetchAllCascadeByYear(departmentId, year);
  }, [departmentId, year]);
  useEffect(() => {
    getCategoryByCategoryId(departmentId);
  }, [departmentId]);
  const getCategoryByCategoryId = async (departmentId) => {
    let res = await getCategoryById(departmentId);
    if (res && res.data.categoryName) {
      setCategoryData(res.data);
    }
  };
  const fetchAllCascadeByYear = async (departmentId, year) => {
    try {
      setIsLoading(true);
      let res = await MinorStatDetailsByCategoryIdAndYearService(
        departmentId,
        year
      );
      if (res?.data?.minorStatDetails) {
        if (res.data.minorStatDetails.length > 0) {
          let uniqueArray = await buildData(res?.data?.minorStatDetails);
          await SortCategoryId(uniqueArray);
          setListCascadeByYear(uniqueArray);
          setIsLoading(false);
          return 1;
        } else {
          // Nếu minorStatDetails là mảng rỗng
          setIsLoading(false);
          setListCascadeByYear([]);
          return -1;
        }
      }
    } catch (error) {
      setIsLoading(false);
      return (
        <>
          <button onClick={() => handleReload()} className="btn btn-primary">
            Vui lòng reload lại trang
          </button>
        </>
      );
    }
  };
  const handleReload = () => {
    window.location.reload(); // Tải lại trang
  };
  const handleSearchYearSpan = () => {
    history.push(`/department-index-revision-by-year-span/${departmentId}`);
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
  const handleBack = () => {
    history.push(`/department-index/${departmentId}`);
  };
  const handleDepartmentIndexRevisionByYear = () => {
    history.push(`/department-index-revision-by-year/${departmentId}/${year}`);
  };
  return (
    <>
      <div className="container mb-5">
        <h2 className="text-center text-primary mt-3">
          Biểu đồ chỉ số{" "}
          <span className="text-warning me-1">{categoryData.categoryName}</span>
        </h2>
        <div className="row">
          {" "}
          <span className="ms-lg-5 ps-lg-4">
            <button className="btn btn-info" onClick={() => handleBack()}>
              <span>
                <i className="fa-solid fa-rotate-left me-1"></i>
              </span>
              <span>Trở về</span>
            </button>
          </span>
        </div>
        <div className="row mt-4 d-flex  gap-3">
          {" "}
          <div className="col-lg-9 ps-lg-5 ms-lg-3 d-flex ">
            <SearchAllRevisionByDate
              year={year}
              fetchAllCascadeByYear={fetchAllCascadeByYear}
              setYear={setYear}
            />
            <div className="col-lg-4 mt-lg-1 ms-lg-5 ">
              <Button
                size="small"
                variant="outlined"
                aria-label="outlined button group"
                onClick={() => {
                  handleDepartmentIndexRevisionByYear();
                }}
              >
                {" "}
                Danh sách chỉ số {categoryData.categoryName} trong năm {year}
              </Button>
            </div>
            <div className="col-lg-4 mt-lg-1 ms-lg-5 ps-1">
              <Button
                size="small"
                variant="outlined"
                aria-label="outlined button group"
                onClick={() => {
                  handleSearchYearSpan();
                }}
              >
                {" "}
                Tìm chỉ số trong nhiều năm
              </Button>
            </div>
          </div>{" "}
          <div className="col-lg-2 d-flex justify-content-end">
            <ExportCSVDepartment
              listCascadeByYear={listCascadeByYear}
              year={year}
              fetchAllCascadeByYear={fetchAllCascadeByYear}
              setYear={setYear}
            />
          </div>
        </div>
        <div className="row">
          {listCascadeByYear && listCascadeByYear.length > 0 ? (
            <>
              {listCascadeByYear.map((item, index) => {
                return (
                  <>
                    <div className="col-12 col-lg-4">
                      {" "}
                      <div className="mt-5">
                        {" "}
                        <div>
                          <h5 className="ps-5 text-center">
                            <span
                              onClick={() => handleDepartment(item)}
                              className="department  underline-opening-success"
                            >
                              {item.categoryName}
                            </span>
                          </h5>
                        </div>
                        <Dashboard
                          data={item}
                          key={`dashboard-${index}`}
                          index={index}
                          handleDepartment={handleDepartment}
                          handleDepartmentRevision={handleDepartmentRevision}
                        />
                      </div>{" "}
                      <div>
                        <h6 className="ps-5  text-center ">
                          <span
                            className="department  underline-opening"
                            onClick={() => handleDepartmentRevision(item)}
                          >
                            Bảng {index + 1}: {item.statName}
                          </span>
                        </h6>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <div className="h6 text-center text-secondary m-3">
              Hiện tại chưa có chỉ số. Vui lòng tạo mới!
            </div>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default DashboardDepartmentIndexRevisionByYear;
