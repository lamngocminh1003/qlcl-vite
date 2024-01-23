import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ScrollToTopButton from "../../../input/ScrollToTopButton";
import { Oval } from "react-loader-spinner";
import { MinorStatDetailsByCategoryIdAndYearSpanService } from "../../../../services/index/DepartmentStat/MinorStatDetailsService";
import ExportCSVDepartment from "../../../input/ExportCSVDepartment";
import { Button } from "@mui/material";
import SearchAllRevisionByYearSpan from "./SearchAllRevisionByYearSpan";
import GroupedBarChart from "./AllDepartment/GroupedBarChart ";
import { SortCategoryId } from "../../Department/SortCategory";
import { getCategoryById } from "../../../../services/categoryService";
import "../../../../App.scss";
import {
  buildData,
  buildDataGroupYearDepartment,
} from "../../Department/BuildData"; // Thay đường dẫn này bằng đường dẫn tới component của bạn
const DashboardDepartmentIndexRevisionByYearSpan = (props) => {
  const [yearStart, setYearStart] = useState(new Date().getFullYear() - 1);
  const [yearEnd, setYearEnd] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [listCascadeByYear, setListCascadeByYear] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [categoryData, setCategoryData] = useState("");
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      let id = props.match.params.id;
      setDepartmentId(id);
    }
  }, []);
  let history = useHistory();
  const handleDepartmentRevision = (item) => {
    history.push(
      `/department-index-revision/${item.statId}/${item.categoryId}`
    );
  };
  useEffect(() => {
    getCategoryByCategoryId(departmentId);
  }, [departmentId]);
  const getCategoryByCategoryId = async (departmentId) => {
    let res = await getCategoryById(departmentId);
    if (res && res.data.categoryName) {
      setCategoryData(res.data);
    }
  };
  useEffect(() => {
    fetchAllCascadeByYear(departmentId, yearStart, yearEnd);
  }, [departmentId, yearStart, yearEnd]);
  useEffect(() => {
    buildListYear(yearStart, yearEnd);
  }, [yearStart, yearEnd]);
  const buildListYear = (yearStart, yearEnd) => {
    const yearStartNumber = +yearStart;
    const yearEndNumber = +yearEnd;
    const newYears = [];
    for (let year = yearStartNumber; year <= yearEndNumber; year++) {
      newYears.push(year); // Chuyển đổi năm thành chuỗi trước khi thêm vào mảng
    }
  };
  const [groupedYearsByStatName, setGroupedYearsByStatName] = useState([]);
  const fetchAllCascadeByYear = async (departmentId, yearStart, yearEnd) => {
    try {
      setIsLoading(true);
      let res = await MinorStatDetailsByCategoryIdAndYearSpanService(
        departmentId,
        yearStart,
        yearEnd
      );
      if (res?.data?.minorStatDetails) {
        if (res.data.minorStatDetails.length > 0) {
          let uniqueArray = await buildData(res?.data?.minorStatDetails);
          await SortCategoryId(uniqueArray);
          setListCascadeByYear(uniqueArray);
          const groupedArrayByStatId = await buildDataGroupYearDepartment(
            uniqueArray
          );
          setGroupedYearsByStatName(groupedArrayByStatId);
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
  const handleSearchYear = () => {
    history.push(`/department-index-revision-by-year/${departmentId}`);
  };
  const handleBack = () => {
    history.push(`/department-index/${departmentId}`);
  };
  const handleDepartment = (item) => {
    history.push(`/department-index/${item.categoryId}`);
  };
  const handleDepartmentIndexRevisionByYearSpan = () => {
    history.push(
      `/department-index-revision-by-year/${departmentId}/${yearStart}/${yearEnd}`
    );
  };
  return (
    <>
      <div className="container mb-5">
        <h2 className="text-center text-primary mt-3">
          Biểu đồ chỉ số{" "}
          <span className="text-warning me-1">{categoryData.categoryName}</span>
          trong nhiều năm
        </h2>{" "}
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
        <div className="row mt-lg-4 d-lg-flex gap-lg-3">
          {" "}
          <div className="col-lg-9 ps-lg-5 ms-lg-3 d-lg-flex  ">
            <SearchAllRevisionByYearSpan
              yearStart={yearStart}
              yearEnd={yearEnd}
              fetchAllCascadeByYear={fetchAllCascadeByYear}
              setYearStart={setYearStart}
              setYearEnd={setYearEnd}
            />{" "}
            <div className="col-lg-4 mt-1 ps-lg-4 ms-lg-2 d-flex align-items-center ">
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  aria-label="outlined button group"
                  onClick={() => {
                    handleDepartmentIndexRevisionByYearSpan();
                  }}
                >
                  {" "}
                  Danh sách chỉ số từ {yearStart} đến {yearEnd}
                </Button>
              </div>
            </div>{" "}
            <div className="col-lg-3 mt-1 ps-lg-2 ms-lg-2 d-flex align-items-center ">
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  aria-label="outlined button group"
                  onClick={() => {
                    handleSearchYear();
                  }}
                >
                  {" "}
                  Tìm chỉ số trong một năm
                </Button>
              </div>
            </div>
          </div>{" "}
          <div className="col-lg-2 d-flex justify-content-end align-items-center">
            <ExportCSVDepartment
              listCascadeByYear={listCascadeByYear}
              yearStart={yearStart}
              yearEnd={yearEnd}
            />
          </div>
        </div>
        <div className="row">
          {listCascadeByYear && listCascadeByYear.length > 0 ? (
            <>
              {groupedYearsByStatName.map((item, index) => {
                return (
                  <>
                    <div className="col-12 col-lg-4 mt-5">
                      {" "}
                      <div className="ps-5">
                        <h5 className="text-center">
                          <span
                            className=" underline-opening-success"
                            onClick={() => handleDepartment(item)}
                          >
                            {" "}
                            {item.categoryName}
                          </span>
                        </h5>
                      </div>
                      <div key={item.statId}>
                        <GroupedBarChart
                          data={item.data}
                          key={`GroupedBarChart-${index}`}
                          index={index}
                        />
                      </div>{" "}
                      <div>
                        <h6 className="ps-5 text-center">
                          <span
                            onClick={() => handleDepartmentRevision(item)}
                            className="underline-opening"
                          >
                            Bảng {index + 1}: {item.statName}{" "}
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

export default DashboardDepartmentIndexRevisionByYearSpan;
