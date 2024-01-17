import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ScrollToTopButton from "../../input/ScrollToTopButton";
import { Oval } from "react-loader-spinner";
import { fetchAllCascadeBySpanYearService } from "../../../services/index/MajorStatDetailService";
import ExportCSV from "../../input/ExportCSV";
import { Button } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import "../../../App.scss";
import SearchAllRevisionByYearSpan from "./SearchAllRevisionByYearSpan";
import GroupedBarChart from "./GroupedBarChart "; // Thay đường dẫn này bằng đường dẫn tới component của bạn
const DashboardHospitalIndexRevisionByYearSpan = () => {
  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listCascadeByYear, setListCascadeByYear] = useState("");
  let history = useHistory();
  const handleDepartmentRevision = (item) => {
    history.push(`/hospital-index/${item.statId}`);
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
  const adjustAverage = (data) => {
    const requiredKeys = ["Q1", "Q2", "Q3", "Q4"];
    requiredKeys.forEach((key) => {
      if (!data.hasOwnProperty(key)) {
        data[key] = {
          stat: null,
          rating: null,
        };
      }
    });

    return data;
  };
  const [groupedYearsByStatName, setGroupedYearsByStatName] = useState([]);
  const fetchAllCascadeByYear = async (yearStart, yearEnd) => {
    try {
      setIsLoading(true);
      let res = await fetchAllCascadeBySpanYearService(yearStart, yearEnd);
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
          let processedData = [];
          // Lặp qua mỗi đối tượng trong mảng majorStatDetails
          dataSort.forEach((detail) => {
            const { statName, effectiveYear, average } = detail;
            // Nếu chưa có dữ liệu cho năm này, khởi tạo một object rỗng để lưu trữ dữ liệu
            if (!processedData[effectiveYear]) {
              processedData[effectiveYear] = {
                year: effectiveYear,
                stats: {},
              };
            }
            // Lưu trữ dữ liệu thống kê của mỗi loại statName trong năm tương ứng
            processedData[effectiveYear].stats[statName] = average;
          });
          const groupedByStatId = dataSort.reduce((acc, item) => {
            const { statId, statName, effectiveYear, average } = item;
            if (!acc[statId]) {
              acc[statId] = {
                statId,
                statName,
                data: [],
              };
            }
            acc[statId].data.push({
              effectiveYear,
              average: adjustAverage(average),
            });
            return acc;
          }, {});
          const groupedArrayByStatId = Object.values(groupedByStatId);
          setGroupedYearsByStatName(groupedArrayByStatId);
          setIsLoading(false);
          return 1;
        } else {
          // Nếu majorStatDetails là mảng rỗng
          setIsLoading(false);
          setListCascadeByYear([]);
          return -1;
        }
      }
      setIsLoading(false);
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
  const handleBack = () => {
    history.push(`/index-hospital`);
  };
  const handleSearchYear = () => {
    history.push(`/hospital-index-revision-by-year`);
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center text-primary mt-3">
          Biểu đồ chỉ số bệnh viện trong nhiều năm
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
                      <div key={item.statId}>
                        {" "}
                        <GroupedBarChart
                          data={item.data}
                          key={`GroupedBarChart-${index}`}
                          index={index}
                        />
                      </div>{" "}
                      <div>
                        <h6 className=" ps-5 text-center ">
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

export default DashboardHospitalIndexRevisionByYearSpan;
