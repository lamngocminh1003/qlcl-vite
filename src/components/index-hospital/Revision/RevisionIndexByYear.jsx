import { fetchAllCascadeByStat } from "../../../services/index/MajorStatManifestService";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import ModalAddNewRevisionIndex from "./ModalAddNewRevisionIndex";
import ModalEditRevisionIndex from "./ModalEditRevisionIndex";
import ScrollToTopButton from "../../input/ScrollToTopButton";
import { getMajorStatById } from "../../../services/index/MajorStatService";
import TableRevisionIndexByYear from "./TableRevisionIndexByYear";
import SearchAllRevisionByYearSpan from "./SearchAllRevisionByYearSpan";
import { buildDataGroupYearMajor } from "../Department/BuildData";
import GroupedBarChart from "../Dashboard/GroupedBarChart ";
const IndexHospital = (props) => {
  const categoryId = localStorage.getItem("categoryId");
  const [showEdit, setShowEdit] = useState(false);
  const [dataRevision, setDataRevision] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [indexId, setIndexId] = useState();
  const [dataMajorStats, setDataMajorStats] = useState();
  const [dataRevisionByIndexId, setDataRevisionByIndexId] = useState();
  const [groupedYearsByStatName, setGroupedYearsByStatName] = useState();
  let history = useHistory();
  const handleBack = () => {
    history.push(`/index-hospital`);
  };
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      let id = props.match.params.id;
      setIndexId(id);
    }
  }, []);
  useEffect(() => {
    fetchAllCascadeByStatService(indexId);
    getMajorStatsById(indexId);
  }, [indexId]);
  const fetchAllCascadeByStatService = async (indexId) => {
    try {
      setIsLoading(true);
      let res = await fetchAllCascadeByStat(indexId);
      if (res?.data?.majorStatDetails) {
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
        let dataSort = roundedData.sort(
          (a, b) => a.effectiveYear - b.effectiveYear
        );
        setDataRevisionByIndexId(dataSort);
        const groupedYearsByStatName = await buildDataGroupYearMajor(dataSort);
        setGroupedYearsByStatName(groupedYearsByStatName.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const getMajorStatsById = async (indexId) => {
    try {
      setIsLoading(true);
      let res = await getMajorStatById(indexId);
      if (res && res.data) {
        setDataMajorStats(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleEdit = (params) => {
    // Xử lý sự kiện khi người dùng nhấn nút "Sửa"
    setShowEdit(true);
    setDataRevision(params.row);
  };
  const handleDepartmentRevision = (params) => {
    history.push(
      `/department-hospital-index-revision/${params.row.cascadeId}/${params.row.effectiveYear}`
    );
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
  return (
    <>
      <ModalEditRevisionIndex
        statName={dataMajorStats?.statName}
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        dataRevision={dataRevision}
        fetchAllCascadeByStatService={fetchAllCascadeByStatService}
        indexId={indexId}
      />
      {!isLoading && (
        <>
          <div className="h1 text-center text-primary m-3 px-md-5 px-3">
            Chỉ số{" "}
            <span className="text-warning">{dataMajorStats?.statName}</span>{" "}
            theo năm
          </div>
          <div className="m-5">
            {" "}
            <div className="row">
              <div className="col-12 col-lg-6 align-self-end">
                <div className="d-flex gap-3">
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
                        <ModalAddNewRevisionIndex
                          fetchAllCascadeByStatService={
                            fetchAllCascadeByStatService
                          }
                          statName={dataMajorStats?.statName}
                          dataRevisionByIndexId={dataRevisionByIndexId}
                          indexId={indexId}
                        />
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </span>
                </div>
                <div className="row m-1">
                  <div className="col-lg-12">
                    <SearchAllRevisionByYearSpan
                      indexId={indexId}
                      setDataRevisionByIndexId={setDataRevisionByIndexId}
                      fetchAllCascadeByStatService={
                        fetchAllCascadeByStatService
                      }
                      dataRevisionByIndexId={dataRevisionByIndexId}
                    />
                  </div>
                </div>
              </div>
              {groupedYearsByStatName ? (
                <div className="col-lg-6 col-12">
                  {" "}
                  <GroupedBarChart
                    data={groupedYearsByStatName}
                    key={`GroupedBarChart-1`}
                  />
                </div>
              ) : (
                <>
                  <div></div>
                </>
              )}
            </div>
            <TableRevisionIndexByYear
              categoryId={categoryId}
              dataRevisionByIndexId={dataRevisionByIndexId}
              dataMajorStats={dataMajorStats}
              handleEdit={handleEdit}
              handleDepartmentRevision={handleDepartmentRevision}
            />
            <ScrollToTopButton />
          </div>
        </>
      )}
    </>
  );
};
export default IndexHospital;
