import { useHistory } from "react-router-dom";
import greenLogo from "../../assets/image/greenlogo.png";
import qt from "../../assets/image/qt.png";
import s from "../../assets/image/5s.png";
import antoan from "../../assets/image/antoan.png";
import ctcl from "../../assets/image/ctcl.png";
import cscl from "../../assets/image/cscl.jpg";
import iso from "../../assets/image/iso.png";
import logoText from "../../assets/image/logotext1.png";
import "./Home.scss";
import ScrollToTopButton from "../input/ScrollToTopButton";
const Home = (props) => {
  let history = useHistory();
  const handleViewCategory = () => {
    history.push(`/categories`);
  };
  const handleViewHospitalIndexByYear = () => {
    history.push(`/hospital-index-revision-by-year`);
  };
  return (
    <>
      <div className="homepage">
        <div className="row up px-5 pt-2">
          <div className="col-4 text-center d-flex justify-content-end align-items-start pe-5 content-left">
            {" "}
            <img
              alt="Logo Bệnh viện Nhi Đồng 2"
              src={greenLogo}
              className="d-flex align-items-center img"
            />{" "}
          </div>
          <div className="col-8 content-right ">
            <div className="item-up">
              <h1 className="upper-case text-green text pt-1">
                PHÒNG QUẢN LÝ CHẤT LƯỢNG
              </h1>
            </div>
            <div className="item-down  my-1 pe-5 ">
              <h5 className="upper-case d-flex justify-content-center ">
                <span className="p-2 text">HỢP TÁC - AN TOÀN - HIỆU QUẢ</span>
              </h5>
            </div>
          </div>
        </div>
        <div className="row down py-5">
          <div className="content-left col-lg-5   ">
            <div className="row ">
              <div className="col-lg-6">
                <div className="row">
                  <img className="img" alt="Quản lý quy trình" src={qt} />
                </div>
                <div className="row text-center">
                  <span>
                    <button
                      className="btn btn-warning"
                      style={{ minWidth: "180px" }}
                      onClick={() => handleViewCategory()}
                    >
                      QUẢN LÝ QUY TRÌNH
                    </button>
                  </span>
                </div>
              </div>
              <div className="col-lg-6">
                {" "}
                <div className="row">
                  <img className="img" alt="Chỉ số chất lượng" src={cscl} />
                </div>
                <div className="row text-center">
                  <span>
                    <button
                      className="btn btn-warning"
                      style={{ minWidth: "180px" }}
                      onClick={() => handleViewHospitalIndexByYear()}
                    >
                      CHỈ SỐ CHẤT LƯỢNG
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-6">
                {" "}
                <div className="row">
                  <img className="img" alt="ISO" src={iso} />
                </div>
                <div className="row text-center">
                  <span>
                    <button
                      className="btn btn-warning"
                      style={{ minWidth: "180px" }}
                    >
                      ISO
                    </button>
                  </span>
                </div>
              </div>
              <div className="col-lg-6">
                {" "}
                <div className="row">
                  <img className="img" alt="Cải tiến chất lượng" src={ctcl} />
                </div>
                <div className="row text-center">
                  <span>
                    <button
                      className="btn btn-warning"
                      style={{ minWidth: "180px" }}
                    >
                      CẢI TIẾN CHẤT LƯỢNG
                    </button>
                  </span>
                </div>
              </div>{" "}
            </div>
            <div className="row mt-5">
              <div className="col-lg-6">
                {" "}
                <div className="row">
                  <img className="img" alt="5S" src={s} />
                </div>
                <div className="row text-center">
                  <span>
                    <button
                      className="btn btn-warning"
                      style={{ minWidth: "180px" }}
                    >
                      5S
                    </button>
                  </span>
                </div>
              </div>{" "}
              <div className="col-lg-6">
                {" "}
                <div className="row">
                  <img className="img" alt="An toàn người bệnh" src={antoan} />
                </div>
                <div className="row text-center">
                  <span>
                    <button
                      className="btn btn-warning"
                      style={{ minWidth: "180px" }}
                    >
                      AN TOÀN NGƯỜI BỆNH
                    </button>
                  </span>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="content-right col-lg-6 px-4 px-lg-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <img
                    alt="Logo Bệnh viện Nhi Đồng 2"
                    src={logoText}
                    className="d-flex align-items-center img-nd"
                  />{" "}
                </div>
              </div>
              <div className="row">
                <h5 className="text-center">CHÍNH SÁCH CHẤT LƯỢNG</h5>
                <h6 className="text-center">SỨ MẠNG</h6>
                <p>
                  &nbsp;&nbsp;&nbsp;Xây dựng bệnh viện hiện đại, thân thiện, đảm
                  bảo cung cấp dịch vụ chăm sóc sức khỏe hiệu quả, an toàn và
                  chất lượng dựa trên y học chứng cứ.
                </p>
                <h6 className="text-center">TẦM NHÌN</h6>
                <p>
                  &nbsp;&nbsp;&nbsp;Trở thành bệnh viện có tất cả các chuyên
                  khoa về Nhi với chất lượng hàng đầu Việt Nam và trong khu vực.
                </p>
                <h6 className="text-center">CAM KẾT THỰC HIỆN</h6>
                <p>
                  &nbsp;&nbsp;&nbsp;Không ngừng nâng cao chất lượng khám và điều
                  trị, đồng thời đáp ứng tốt nhất các nhu cầu cần thiết của bệnh
                  nhân và thân nhân bệnh nhân theo pháp luật vầ quy trình hiện
                  hành.
                </p>{" "}
                <h6 className="text-center">GIÁ TRỊ CỐT LÕI</h6>
                <div className="text-center">
                  "AN TOÀN - CHẤT LƯỢNG - HIỆU QUẢ - THÂN THIỆN"
                </div>
              </div>
            </div>
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
