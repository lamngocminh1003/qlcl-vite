import { useState, useEffect } from "react";
import SearchAllRevisionByDate from "./SearchAllRevisionByDate";
import { useHistory } from "react-router-dom";
import ScrollToTopButton from "../../input/ScrollToTopButton";
import { Oval } from "react-loader-spinner";
import { Button } from "@mui/material";
import { fetchAllCascadeByYearService } from "../../../services/index/MajorStatDetailService";
import ExportCSV from "../../input/ExportCSV";
import Dashboard from "./Chart";
const DashboardHospitalIndexRevisionByYear = () => {
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listCascadeByYear, setListCascadeByYear] = useState("");
  let history = useHistory();
  const handleDepartmentRevision = (item) => {
    history.push(
      `/department-hospital-index-revision/${item.cascadeId}/${item.effectiveYear}`
    );
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
      let res = await fetchAllCascadeByYearService(year);
      if (res?.data?.majorStatDetails) {
        if (res.data.majorStatDetails.length > 0) {
          const roundedData = res?.data?.majorStatDetails.map((item) => {
            const roundedAverage = {};
            for (const key in item.average) {
              const roundedRating =
                Math.round(item.average[key].stat * 100) / 100; // Làm tròn đến 2 chữ số thập phân
              roundedAverage[key] = {
                ...item.average[key],
                stat: roundedRating,
              };
            }
            return { ...item, average: roundedAverage };
          });
          let dataSort = roundedData.sort((a, b) => a.statId - b.statId);
          setListCascadeByYear(dataSort);
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
    history.push(`/hospital-index-revision-by-year-span`);
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
    history.push(`/index-hospital`);
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center text-primary mt-3">
          Biểu đồ chỉ số bệnh viện
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
            <ExportCSV
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
                        handleDepartmentRevision={handleDepartmentRevision}
                      />{" "}
                      <div>
                        <h6
                          className="ps-5 text-center "
                          onClick={() => handleDepartmentRevision(item)}
                        >
                          <span className="underline-opening">
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
              Hiện tại chưa có chỉ số bệnh viện. Vui lòng tạo mới!
            </div>
          )}
        </div>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default DashboardHospitalIndexRevisionByYear;
