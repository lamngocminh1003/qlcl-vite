import { useState, useEffect } from "react";
import SearchAllRevisionByDate from "./SearchAllRevisionByDate";
import { useHistory } from "react-router-dom";
import ScrollToTopButton from "../../../../input/ScrollToTopButton";
import { Oval } from "react-loader-spinner";
import { Button } from "@mui/material";
import { MinorStatDetailsByYearService } from "../../../../../services/index/DepartmentStat/MinorStatDetailsService";
import ExportCSVDepartment from "../../../../input/ExportCSVDepartment";
import Dashboard from "./Chart";
import { SortCategoryId } from "../../../Department/SortCategory";
import { buildData } from "../../../Department/BuildData";
const DashboardAllDepartmentIndexRevisionByYear = () => {
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listCascadeByYear, setListCascadeByYear] = useState("");
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
    const currentYear = new Date().getFullYear();
    setYear(currentYear.toString());
  }, []); // [] ensures that this effect runs only once after the component mounts
  useEffect(() => {
    fetchAllCascadeByYear(year);
  }, [year]);
  const fetchAllCascadeByYear = async (year) => {
    try {
      setIsLoading(true);
      let res = await MinorStatDetailsByYearService(year);
      if (res?.data?.minorStatDetails) {
        if (res.data.minorStatDetails.length > 0) {
          let uniqueArray = await buildData(res?.data?.minorStatDetails);
          await SortCategoryId(uniqueArray);
          setListCascadeByYear(uniqueArray);
          setIsLoading(false);
          return 1;
        } else {
          // Nếu majorStatDetails là mảng rỗng
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
    history.push(`/all-department-index-revision-by-year-span`);
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
    history.push(`/department-index`);
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center text-primary mt-3">
          Biểu đồ chỉ số khoa/phòng
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
        <div className="row mt-4 d-lg-flex  gap-3">
          {" "}
          <div className="col-lg-9 ps-lg-5 ms-lg-3 d-flex ">
            <SearchAllRevisionByDate
              year={year}
              fetchAllCascadeByYear={fetchAllCascadeByYear}
              setYear={setYear}
            />
            <div className="col-lg-9 mt-lg-1 ps-lg-5 ms-lg-5">
              <div className=" ps-lg-5 ">
                <Button
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
                      <Dashboard
                        data={item}
                        key={`dashboard-${index}`}
                        index={index}
                        handleDepartment={handleDepartment}
                        handleDepartmentRevision={handleDepartmentRevision}
                      />
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <div className="h6 text-center text-secondary m-3">
              Hiện tại chưa có chỉ số khoa/ phòng. Vui lòng tạo mới!
            </div>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default DashboardAllDepartmentIndexRevisionByYear;
