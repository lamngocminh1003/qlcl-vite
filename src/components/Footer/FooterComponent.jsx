import React from "react";
import greenLogo from "../../assets/image/greenlogo.png";

const FooterComponent = () => {
  return (
    <>
      <div>
        <footer
          className=" text-center text-lg-start "
          style={{
            backgroundColor: "#c7f2a4",
            color: "#525B44",
          }}
        >
          <div className="container p-4">
            <div className="row my-4">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0 ">
                <div
                  className="rounded-circle bg-white shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto"
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "lightblue",
                  }}
                >
                  <img
                    alt="Logo Bệnh viện Nhi Đồng 2"
                    src={greenLogo}
                    height="150"
                    loading="lazy"
                  />{" "}
                </div>

                <p
                  className="text-center"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Bệnh viện Nhi Đồng 2 là một trong những bệnh viện nhi hàng đầu
                  tại Việt Nam, với lịch sử lâu đời và uy tín trong lĩnh vực
                  chăm sóc sức khỏe trẻ em. Bệnh viện hoạt động với sứ mệnh mang
                  đến cho trẻ em các dịch vụ y tế toàn diện, chất lượng cao, đạt
                  tiêu chuẩn quốc tế ngay tại Việt Nam.
                </p>

                <ul className="list-unstyled d-flex flex-row justify-content-center">
                  <li>
                    <a className=" px-2" href="https://www.facebook.com/bvnd2">
                      <i
                        className="fab fa-facebook-square"
                        style={{
                          color: "#525B44",
                        }}
                      ></i>
                    </a>
                  </li>

                  <li>
                    <a className=" ps-2" href="http://www.benhviennhi.org.vn/">
                      <i
                        className="fa-solid fa-globe"
                        style={{
                          color: "#525B44",
                        }}
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">Dịch vụ nổi bật</h5>

                <ul className="list-unstyled">
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>
                      Khám và điều trị bệnh
                    </p>
                  </li>
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>
                      Phẫu thuật chuyên sâu
                    </p>
                  </li>
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>
                      Chăm sóc sơ sinh đặc biệt
                    </p>
                  </li>
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>Tư
                      vấn dinh dưỡng và phát triển
                    </p>
                  </li>
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>
                      Hồi sức và cấp cứu
                    </p>
                  </li>
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>Tư
                      vấn dinh dưỡng
                    </p>
                  </li>
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>
                      Hỗ trợ phát triển tâm lý
                    </p>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">Cơ sở vật chất</h5>

                <ul className="list-unstyled">
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>
                      Bệnh viện được trang bị hệ thống máy móc hiện đại như máy
                      chụp CT, MRI, siêu âm Doppler.
                    </p>
                  </li>
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>
                      Phòng bệnh sạch sẽ, thoáng mát, thân thiện với trẻ em.
                    </p>
                  </li>
                  <li className="mb-2">
                    <p
                      style={{
                        color: "#525B44",
                      }}
                    >
                      <i className="fa-solid fa-hand-holding-heart pe-3"></i>Có
                      khu vui chơi và giải trí dành riêng cho trẻ em để giảm
                      căng thẳng trong quá trình điều trị.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">Liên hệ</h5>

                <ul className="list-unstyled">
                  <li>
                    <p>
                      <i className="fas fa-map-marker-alt pe-2"></i>14 Lý Tự
                      Trọng, Phường Bến Nghé, Quận 1, TP. HCM
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fas fa-phone pe-2"></i>(028) 38295723 -
                      (028) 38295724
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="fa-solid fa-tty pe-2 mb-0"></i>
                      CSKH: 19001215{" "}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2024 Copyright:
            <p
              style={{
                color: "#525B44",
              }}
              href="https://mdbootstrap.com/"
            >
              Ngọc Minh - 0950080034
            </p>
          </div>
        </footer>
      </div>{" "}
    </>
  );
};

export default FooterComponent;
