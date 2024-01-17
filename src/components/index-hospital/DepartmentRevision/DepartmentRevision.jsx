import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import ScrollToTopButton from "../../input/ScrollToTopButton";
import { getCascadeByIdService } from "../../../services/index/MajorStatManifestService";
import { getMajorStatById } from "../../../services/index/MajorStatService";
import {
  fetchAllMajorStatDetailByStatAndYearService,
  fetchAllCascadeByStatService,
} from "../../../services/index/MajorStatDetailService";
import Dashboard from "../Dashboard/Chart";
import { Box, Typography, Button } from "@mui/material";
import "./DepartmentRevision.scss";
import { TableDepartmentRevision } from "./TableDepartmentRevision";
import { useHistory } from "react-router-dom";
import ModalEditDepartment from "./ModalEditDepartment";
import { updateMajorStatManifestService } from "../../../services/index/MajorStatDetailService";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ModalUploadFile from "./ModalUploadFile";
import { SortCategoryId } from "../Department/SortCategory";
import { columnsIndex, columnDepartment } from "../../input/Column";
const DepartmentRevision = (props) => {
  const categoryId = localStorage.getItem("categoryId");
  const [showEdit, setShowEdit] = useState(false);
  const [dataMajorStats, setDataMajorStats] = useState({});
  const [dataDepartment, setDataDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [revisionId, setRevisionId] = useState("");
  const [yearEffective, setYearEffective] = useState("");
  const [listDepartment, setListDepartment] = useState("");
  const [statId, setStatId] = useState("");
  const [statName, setStatName] = useState("");
  const [dataRevisionByIndexId, setDataRevisionByIndexId] = useState("");
  const [dataMajorStatDetails, setDataMajorStatDetails] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [showEditFileContent, setShowEditFileContent] = useState(false);
  const [listCascadeByYear, setListCascadeByYear] = useState({});
  const handleEditFileContent = () => {
    setShowEditFileContent(true);
  };
  let history = useHistory();
  const column1 = [...columnsIndex, ...columnDepartment];
  const columnActive = [
    {
      field: "active",
      headerName: "Trạng thái",
      width: 140,
      valueGetter: (params) => {
        if (params.value === true) {
          return "Áp dụng";
        } else if (params.value === false) {
          return "Không áp dụng";
        }
        return params.value; // Giữ nguyên giá trị nếu không trùng khớp
      },
      renderCell: ({ row }) => {
        const { active } = row;
        const buttonStyle = {
          backgroundColor: active ? "#0d6efd" : "#6c757d",
          cursor: "pointer",
        };
        const boxStyle = {
          backgroundColor: active ? "#0d6efd" : "#6c757d",
        };
        const displayText = active ? "Áp dụng" : "Không áp dụng";
        if (categoryId == 1) {
          // Nếu categoryId bằng 1, hiển thị Typography thay vì Button
          return (
            <Button
              variant="contained"
              style={buttonStyle}
              onClick={() => handleClick(row)}
              className="buttonActive"
            >
              {displayText}
            </Button>
          );
        } else {
          // Ngược lại, hiển thị Button
          return (
            <Box style={boxStyle} className="boxActive">
              <Typography
                color="#eeeded"
                style={boxStyle}
                className="boxActive"
              >
                {displayText}
              </Typography>
            </Box>
          );
        }
      },
    },
  ];
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      let id = props.match.params.id;
      setRevisionId(id);
    }
  }, []);
  useEffect(() => {
    getCascadeById(revisionId);
  }, [revisionId]);
  const getCascadeById = async (revisionId) => {
    if (revisionId) {
      try {
        setIsLoading(true);
        let res = await getCascadeByIdService(revisionId);
        if (res?.data) {
          setDataRevisionByIndexId(res.data);
          setStatId(res.data.statId);
          setYearEffective(res.data.effectiveYear);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchAllMajorStatDetailByStatAndYear(statId, yearEffective);
    fetchAllCascadeByStat(statId);
  }, [statId, yearEffective]);
  const fetchAllMajorStatDetailByStatAndYear = async (
    statId,
    yearEffective
  ) => {
    if (statId && yearEffective) {
      try {
        setIsLoading(true);
        let res = await fetchAllMajorStatDetailByStatAndYearService(
          statId,
          yearEffective
        );
        if (res?.data) {
          setIsLoading(false);
          setDataMajorStatDetails(res.data.majorStatDetails);
          fetchAllCascadeByStat(statId);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  const fetchAllCascadeByStat = async (statId) => {
    if (statId) {
      try {
        setIsLoading(true);
        let res = await fetchAllCascadeByStatService(statId);
        if (res?.data) {
          setIsLoading(false);
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
            let desiredObject = dataSort.find(
              (item) => item.effectiveYear === yearEffective
            );

            if (desiredObject) {
              // Đối tượng đã được tìm thấy
              setListCascadeByYear(desiredObject);
            } else {
              // Không có đối tượng nào có effectiveYear bằng với yearEffective
              setListCascadeByYear({});
            }
            setIsLoading(false);
            return 1;
          } else {
            // Nếu majorStatDetails là mảng rỗng
            setIsLoading(false);
            return -1;
          }
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    buildData(dataMajorStatDetails);
  }, [dataMajorStatDetails]);
  const buildData = async (dataMajorStatDetails) => {
    if (dataMajorStatDetails) {
      const resultArray = dataMajorStatDetails.reduce((acc, item) => {
        let existingItem = acc.find(
          (elem) =>
            elem.categoryId === item.categoryId &&
            elem.statId === item.statId &&
            elem.effectiveYear === item.effectiveYear &&
            elem.criteria === item.criteria &&
            elem.formula === item.formula &&
            elem.active === item.active
        );
        if (!existingItem) {
          existingItem = {
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            statId: item.statId,
            statName: item.statName,
            effectiveYear: item.effectiveYear,
            criteria: item.criteria,
            formula: item.formula,
            active: item.active,
          };
          acc.push(existingItem);
        }
        // Add stat if it exists and then proceed to add missing timestamps
        if (item.stat !== null && item.stat !== undefined) {
          existingItem[item.timestamp] = parseFloat(item.stat.toFixed(2)); // Round RKQ value to 2 decimal places;
          const allTimestamps = ["Q1", "Q2", "Q3", "Q4"];
          addMissingFields(existingItem, allTimestamps); // Add missing timestamps
          // Add rating if it exists and proceed to add missing rating timestamps
          if (item.rating !== null && item.rating !== undefined) {
            existingItem["R" + item.timestamp] = item.rating;
            const ratingTimestamps = allTimestamps.map(
              (timestamp) => "R" + timestamp
            );
            addMissingFields(existingItem, ratingTimestamps); // Add missing rating timestamps
          }
        }
        return acc;
      }, []);
      let uniqueArray = await SortCategoryId(resultArray);
      setListDepartment(uniqueArray);
    }
  };
  // Utility function to add missing fields
  const addMissingFields = (existingItem, fields) => {
    fields.forEach((field) => {
      if (existingItem[field] === undefined) {
        existingItem[field] = null;
      }
    });
  };
  const getMajorStatsByIdService = async (statId) => {
    if (statId) {
      try {
        setIsLoading(true);
        let res = await getMajorStatById(statId);
        if (res && res.data) {
          setStatName(res.data.statName);
          setDataMajorStats(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    getMajorStatsByIdService(statId);
  }, [statId]);
  const handleEdit = (row, field) => {
    // Xử lý sự kiện khi người dùng nhấn nút "Sửa"
    setShowEdit(true);
    setDataDepartment(row);
    setTimestamp(field);
  };
  const handleClick = async (row) => {
    let activeClick = row.active === true ? false : true;
    try {
      let res = await updateMajorStatManifestService(
        revisionId,
        row.categoryId,
        activeClick
      );
      if (res) {
        //success
        fetchAllMajorStatDetailByStatAndYear(statId, yearEffective);
      }
    } catch (error) {}
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
    history.push(`/hospital-index/${statId}`);
  };

  return (
    <>
      <ModalUploadFile
        setShowEditFileContent={setShowEditFileContent}
        showEditFileContent={showEditFileContent}
        revisionId={revisionId}
        fetchAllMajorStatDetailByStatAndYear={
          fetchAllMajorStatDetailByStatAndYear
        }
        statId={statId}
        yearEffective={yearEffective}
      />
      <ModalEditDepartment
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        dataDepartment={dataDepartment}
        timestamp={timestamp}
        revisionId={revisionId}
        fetchAllMajorStatDetailByStatAndYear={
          fetchAllMajorStatDetailByStatAndYear
        }
        statId={statId}
        yearEffective={yearEffective}
      />{" "}
      {!isLoading && (
        <>
          <div className="h1 text-center text-primary m-3 px-md-5 px-3">
            Chỉ số <span className="text-warning">{statName}</span> theo khoa/
            phòng năm{" "}
            <span className="text-warning">
              {dataRevisionByIndexId.effectiveYear}
            </span>
          </div>
          <div className="container mb-3">
            <div className="row">
              <div className="col-12 col-lg-6 align-self-end">
                <div className="d-flex gap-3 mb-lg-5">
                  {" "}
                  <span>
                    <button
                      className="btn btn-info"
                      onClick={() => handleBack()}
                    >
                      <span>
                        <i className="fa-solid fa-rotate-left me-1"></i>
                      </span>
                      <span>Trở về</span>
                    </button>
                  </span>
                  <span>
                    {categoryId == 1 ? (
                      <span>
                        <Button
                          variant="outlined"
                          aria-label="outlined button group"
                          onClick={() => handleEditFileContent()}
                        >
                          <span>
                            <FileUploadIcon />
                          </span>
                          <span>Upload danh sách</span>
                        </Button>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-12 col-lg-6 ">
                {" "}
                <Dashboard
                  data={listCascadeByYear}
                  key={`dashboard-${1}`}
                  index={1}
                />
              </div>
            </div>
            <TableDepartmentRevision
              listDepartment={listDepartment}
              categoryId={categoryId}
              handleClick={handleClick}
              handleEdit={handleEdit}
              column1={column1}
              columnActive={columnActive}
              dataMajorStats={dataMajorStats}
            />
            <ScrollToTopButton />
          </div>
        </>
      )}
    </>
  );
};
export default DepartmentRevision;
