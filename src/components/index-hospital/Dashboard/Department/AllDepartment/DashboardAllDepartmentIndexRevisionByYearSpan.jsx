import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ScrollToTopButton from "../../../../input/ScrollToTopButton";
import { Oval } from "react-loader-spinner";
import { MinorStatDetailsByYearSpanService } from "../../../../../services/index/DepartmentStat/MinorStatDetailsService";
import ExportCSV from "../../../../input/ExportCSVDepartment";
import { Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchAllRevisionByYearSpan from "./SearchAllRevisionByYearSpan";
import {
  buildData,
  buildDataGroupYearDepartment,
} from "../../../Department/BuildData";
import "../../../../../App.scss";
import { SortCategoryId } from "../../../Department/SortCategory";
import GroupedBarChart from "./GroupedBarChart "; // Thay đường dẫn này bằng đường dẫn tới component của bạn
const DashboardAllDepartmentIndexRevisionByYearSpan = () => {
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listCascadeByYear, setListCascadeByYear] = useState("");
  let history = useHistory();
  const handleDepartmentRevision = (item) => {
    history.push(
      `/department-index-revision/${item.statId}/${item.categoryId}`
    );
  };
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1; // Lấy năm trước đó
    setYearStart(previousYear.toString());
    setYearEnd(currentYear.toString());
  }, []); // [] ensures that this effect runs only once after the component mounts
  useEffect(() => {
    fetchAllCascadeByYear(yearStart, yearEnd);
    buildListYear(yearStart, yearEnd);
  }, [yearStart, yearEnd]);
  const [years, setYears] = useState([]);
  const buildListYear = (yearStart, yearEnd) => {
    const yearStartNumber = +yearStart;
    const yearEndNumber = +yearEnd;
    const newYears = [];
    for (let year = yearStartNumber; year <= yearEndNumber; year++) {
      newYears.push(year); // Chuyển đổi năm thành chuỗi trước khi thêm vào mảng
    }
    setYears(newYears); // Cập nhật state years bằng mảng mới
  };
  const [groupedYearsByStatName, setGroupedYearsByStatName] = useState([]);
  const fetchAllCascadeByYear = async (yearStart, yearEnd) => {
    try {
      setIsLoading(true);
      let res = await MinorStatDetailsByYearSpanService(yearStart, yearEnd);
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
    history.push(`/all-department-index-revision-by-year`);
  };
  const handleBack = () => {
    history.push(`/department-index`);
  };
  const handleDepartment = (item) => {
    history.push(`/department-index/${item.categoryId}`);
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center text-primary mt-3">
          Biểu đồ chỉ số khoa/phòng trong nhiều năm
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
        <div className="row mt-lg-4 d-lg-flex  gap-lg-3">
          {" "}
          <div className="col-lg-9 ps-lg-5 ms-lg-3 d-lg-flex ">
            <SearchAllRevisionByYearSpan
              yearStart={yearStart}
              yearEnd={yearEnd}
              fetchAllCascadeByYear={fetchAllCascadeByYear}
              setYearStart={setYearStart}
              setYearEnd={setYearEnd}
            />{" "}
            <div className="col-lg-5 mt-1 ps-5 ms-5 d-flex align-items-center ">
              <div className="ps-lg-5 ">
                <Button
                  variant="outlined"
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
          <div className="col-lg-2 d-flex justify-content-end align-items-center mt-2">
            <ExportCSV
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
                        <h5 className="text-center ">
                          <span
                            className="underline-opening-success"
                            onClick={() => handleDepartment(item)}
                          >
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
                        <h6 className="ps-5 text-center ">
                          <span
                            className="underline-opening"
                            onClick={() => handleDepartmentRevision(item)}
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
              Hiện tại chưa có chỉ số bệnh viện. Vui lòng tạo mới! Hoặc tải lại
              trang{" "}
              <button
                onClick={() => handleReload()}
                className="btn btn-primary"
              >
                <CachedIcon />
              </button>
            </div>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default DashboardAllDepartmentIndexRevisionByYearSpan;
