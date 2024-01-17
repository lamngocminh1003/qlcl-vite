import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  ReferenceLine,
} from "recharts";
import "../../../../../App.scss";
const Dashboard = ({
  data,
  index,
  handleDepartmentRevision,
  handleDepartment,
}) => {
  const quarters = [
    {
      name: "Q1",
      value: data?.statQ1,
      evaluation: data?.RQ1,
    },
    {
      name: "Q2",
      value: data?.statQ2,
      evaluation: data?.RQ2,
    },
    {
      name: "Q3",
      value: data?.statQ3,
      evaluation: data?.RQ3,
    },
    {
      name: "Q4",
      value: data?.statQ4,
      evaluation: data?.RQ4,
    },
  ];

  const filteredValues = quarters
    .map((item) => item.value)
    .filter((value) => value !== null && value !== undefined && !isNaN(value));

  const hasValues = filteredValues.length > 0;
  let yAxisMax;
  if (hasValues && filteredValues.length > 1) {
    const maxValue = Math.max(...filteredValues);
    yAxisMax = Math.round(maxValue * 1.2); // 20% cao hơn
  } else if (hasValues && filteredValues.length === 1) {
    if (filteredValues[0] === 1) {
      yAxisMax = Math.round(filteredValues[0] * 1.2) + 2; // 20% cao hơn giá trị bằng 1 + 2
    } else {
      yAxisMax = Math.round(filteredValues[0] * 1.2); // 20% cao hơn giá trị duy nhất
    }
  } else {
    yAxisMax = 0; // Thiết lập giá trị mặc định nếu không có giá trị
  }
  let allValuesBelowCriteriaManifest = false;
  if (hasValues) {
    allValuesBelowCriteriaManifest = filteredValues.every(
      (value) => value < data.criteriaManifest
    );
  }

  if (allValuesBelowCriteriaManifest) {
    // Nếu tất cả giá trị trong quarters đều nhỏ hơn data.criteriaManifest,
    // thiết lập yAxisMax cao hơn 20% giá trị đó
    yAxisMax =
      data.criteriaManifest === 1 ? 2 : Math.round(data.criteriaManifest * 1.2);
  }
  function CustomTooltip({ payload, label, active }) {
    if (active && payload.length > 0) {
      const value = payload[0].value;
      const evaluation = payload[0].payload.evaluation;

      let evaluationText;
      let evaluationColor;
      if (evaluation === 1) {
        evaluationText = "Đạt";
        evaluationColor = "#5D9C59"; // Màu xanh cho Đạt
      } else if (evaluation === -1) {
        evaluationText = "Chưa Đạt";
        evaluationColor = "#C70039"; // Màu đỏ cho Không Đạt
      } else {
        evaluationText = "Chưa có ĐG";
        evaluationColor = "#5F8670"; // Màu cam cho Chưa có ĐG
      }

      const evaluationStyle = {
        color: evaluationColor, // Màu chữ dựa trên evaluation
      };

      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={evaluationStyle}
          >{`${label} : ${value} - ${evaluationText}`}</p>
        </div>
      );
    }
    return null;
  }

  const renderCustomBarLabel = (props) => {
    let { x, y, width, evaluation } = props;
    // Chuyển đổi giá trị của evaluation
    let label =
      evaluation === -1 ? "Chưa đạt" : evaluation === 1 ? "Đạt" : "Chưa có ĐG";
    return (
      <>
        <text
          x={x + width / 2}
          y={y}
          textAnchor="middle"
          dy={-6}
          fontSize={12}
          fill={
            evaluation === -1
              ? "#C70039"
              : evaluation === 1
              ? "#5D9C59"
              : "#93B1A6"
          }
        >
          {` ${label}`}
        </text>
      </>
    );
  };

  return (
    <>
      <div className="mt-5">
        {" "}
        <div>
          <h5 className="ps-5 text-center">
            <span
              onClick={() => handleDepartment(data)}
              className="department  underline-opening-success"
            >
              {data.categoryName}
            </span>
          </h5>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={quarters}
            margin={{ bottom: 10 }}
            isZoomEnabled={false}
          >
            <XAxis dataKey="name" />
            {/* Sử dụng giá trị YAxis mới tính toán được */}
            <YAxis domain={[0, yAxisMax]} />
            <CartesianGrid stroke="#ccc" />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="#82CD47"
              label={(props) =>
                renderCustomBarLabel({
                  ...props,
                  evaluation: quarters[props.index]?.evaluation,
                })
              }
            />
            <ReferenceLine
              y={data.criteriaManifest}
              stroke="red"
              label={`${data.criteriaManifest} ${data.unit}`}
            />
          </BarChart>
        </ResponsiveContainer>{" "}
        <div>
          <h6 className="ps-5  text-center ">
            <span
              className="department  underline-opening"
              onClick={() => handleDepartmentRevision(data)}
            >
              Bảng {index + 1}: {data.statName}
            </span>
          </h6>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
