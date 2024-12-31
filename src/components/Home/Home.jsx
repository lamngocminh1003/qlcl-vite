import { useHistory } from "react-router-dom";
import greenLogo from "../../assets/image/greenlogo.png";
import qt from "../../assets/image/qt.png";
import qlqt from "../../assets/image/qlqt.png";
import qlcsbv from "../../assets/image/qlcsbv.png";
import pm from "../../assets/image/pm.png";
import tk from "../../assets/image/tk.png";
import cscl from "../../assets/image/cscl.jpg";
import logoText from "../../assets/image/logotext1.png";
import "./Home.scss";
import ScrollToTopButton from "../input/ScrollToTopButton";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../input/ExampleCarouselImage";
const Home = (props) => {
  let history = useHistory();
  const handleViewCategory = () => {
    history.push(`/folders`);
  };
  const handleViewHospitalIndexByYear = () => {
    history.push(`/hospital-index-revision-by-year`);
  };
  return (
    <>
      <div className="homepage">
        <div className="row up px-5 p-2">
          <div className="col-3 text-center d-flex justify-content-end align-items-start pe-5 content-left">
            {" "}
            <img
              alt="Logo Bệnh viện Nhi Đồng 2"
              src={greenLogo}
              className="d-flex align-items-center img"
            />{" "}
          </div>
          <div className="col-9 content-right align-items-center">
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
        <div className="row " style={{ backgroundColor: "#DCFFB7" }}>
          <Carousel>
            <Carousel.Item>
              <ExampleCarouselImage imageUrl={pm} />
            </Carousel.Item>
            <Carousel.Item>
              <ExampleCarouselImage imageUrl={qlqt} />
            </Carousel.Item>
            <Carousel.Item>
              <ExampleCarouselImage imageUrl={qlcsbv} />
            </Carousel.Item>
          </Carousel>
        </div>

        <div className="row down py-5">
          <div className="content-left col-lg-5  ">
            <div className="row ">
              <div className="col-lg-6 ">
                <div className="card">
                  <div className="image">
                    {" "}
                    <img
                      style={{ height: "150px", width: "230px" }}
                      alt="Quản lý quy trình"
                      src={qt}
                    />
                  </div>
                  <div className="content">
                    <a onClick={() => handleViewCategory()}>
                      <span className="title">QUẢN LÝ QUY TRÌNH</span>
                    </a>

                    <p className="desc">
                      Tạo, chỉnh sửa, tham chiếu và quản lý quy trình làm việc
                      hoặc tiêu chuẩn áp dụng cho các bộ phận trong bệnh viện.
                      Gắn quy trình vào các khoa/phòng hoặc chỉ số chất lượng cụ
                      thể.
                    </p>

                    <a
                      className="btn btn-outline-success "
                      onClick={() => handleViewCategory()}
                    >
                      Xem tại đây
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>{" "}
              <div className="col-lg-6 mb-4">
                <div className="card">
                  <div className="image">
                    {" "}
                    <img
                      style={{ height: "150px", width: "230px" }}
                      alt="Chỉ số chất lượng"
                      src={cscl}
                    />
                  </div>
                  <div className="content">
                    <a onClick={() => handleViewHospitalIndexByYear()}>
                      <span className="title">CHỈ SỐ CHẤT LƯỢNG</span>
                    </a>

                    <p className="desc">
                      Tạo và quản lý các chỉ số đánh giá chất lượng ở cấp độ
                      bệnh viện,khoa/ phòng bao gồm mục tiêu, đánh giá, và điểm
                      số thực tế. Tích hợp công cụ đánh giá hiệu quả giữa các
                      năm.
                    </p>

                    <a
                      className="btn btn-outline-success "
                      onClick={() => handleViewHospitalIndexByYear()}
                    >
                      Xem tại đây
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 ">
                {" "}
                <div className="progress ">
                  <div
                    className="progress-bar progress-bar-striped "
                    role="progressbar"
                    style={{ width: "100%", backgroundColor: "#8FD14F" }}
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>{" "}
                <img
                  alt="Logo Bệnh viện Nhi Đồng 2"
                  style={{ width: "630px" }}
                  src={tk}
                  className="d-flex align-items-center   border border-light rounded mt-4"
                />{" "}
              </div>
            </div>
          </div>
          <div className="content-right col-lg-6 px-4 px-lg-5 d-flex flex-column  align-items-start">
            <div className="container mb-4">
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
            <div className="row">
              <div className="progress ">
                <div
                  className="progress-bar progress-bar-striped "
                  role="progressbar"
                  style={{
                    width: "100%",
                    backgroundColor: "#A2CA71",
                  }}
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>{" "}
              <div
                className="text-center h2 my-3 "
                style={{ fontWeight: "700", color: "#1A5319" }}
              >
                <i className="fa-solid fa-star me-2 "></i>
                NỔI BẬT
              </div>
              <div className="cards ">
                <div className="card red">
                  <i className="fa-solid fa-folder h1"></i>
                  <p className="px-2 h6">Với hơn 130 quy trình tại bệnh viện</p>
                </div>
                <div className="card blue">
                  <i className="fa-solid fa-file-shield h1"></i>{" "}
                  <p className="px-2 h6">
                    206 tài liệu được công bố và hết hiệu lực
                  </p>
                </div>
                <div className="card green">
                  {" "}
                  <i className="fa-solid fa-hospital-user h1"></i>{" "}
                  <p className="px-2 h6">
                    Lưu trữ đầy đủ người dùng từ 49 khoa/phòng
                  </p>
                </div>
              </div>{" "}
              <div className="cards mt-3">
                <div className="card green">
                  {" "}
                  <i className="fa-solid fa-hospital h1"></i>{" "}
                  <p className="px-2 h6">
                    Lưu trữ 66 kết quả đánh giá năm dữ liệu thuộc chỉ số bệnh
                    viện
                  </p>
                </div>{" "}
                <div className="card red">
                  <i className="fa-solid fa-users-between-lines h1"></i>{" "}
                  <p className="px-2 h6">
                    Cập nhật hơn 9000 kết quả đánh giá của các chỉ số thuộc
                    khoa/phòng
                  </p>
                </div>
                <div className="card blue">
                  <i class="fa-solid fa-chart-pie h1"></i>{" "}
                  <p className="px-2 h6">
                    Các dạng thống kê số liệu đa dạng hiệu quả
                  </p>{" "}
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
