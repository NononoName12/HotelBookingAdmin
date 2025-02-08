import {
  faThLarge,
  faUser,
  faHotel,
  faRestroom,
  faRightFromBracket,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include", // Đảm bảo gửi cookie nếu cần
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Logout failed:", errorData.message);
      } else {
        // Xử lý sau khi logout thành công
        window.location.href = "/login"; // Chuyển hướng đến trang login hoặc trang khác
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLink = (link) => {
    navigate(`/${link}`);
  };

  return (
    <>
      <FontAwesomeIcon icon="fa-solid fa-grid-horizontal" />
      <div>
        <div style={{ margin: "15px 0" }}>
          <h5>MAIN</h5>
          <div className="itemInfor">
            <FontAwesomeIcon icon={faThLarge} className="iconStyle" />
            <button
              className="btnLeft"
              // onCliconStyleick={() => handleLink("")}
              onClick={() => handleLink("")}
            >
              Dashboard
            </button>
          </div>
        </div>
        <div style={{ margin: "15px 0" }}>
          <h5>LISTS</h5>
          <div className="itemInfor">
            <FontAwesomeIcon icon={faUser} className="iconStyle" />
            <button className="btnLeft">Users</button>
          </div>
          <div className="itemInfor">
            <FontAwesomeIcon icon={faHotel} className="iconStyle" />
            <button
              className="btnLeft"
              onClick={() => handleLink("hotelsDashboard")}
            >
              Hotels
            </button>
          </div>
          <div className="itemInfor">
            <FontAwesomeIcon icon={faRestroom} className="iconStyle" />
            <button
              className="btnLeft"
              onClick={() => handleLink("roomsDashboard")}
            >
              Rooms
            </button>
          </div>
          <div className="itemInfor">
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="iconStyle"
            />
            <button
              className="btnLeft"
              onClick={() => handleLink("transactionsDashboard")}
            >
              Transactions
            </button>
          </div>
        </div>
        <div style={{ margin: "15px 0" }}>
          <h5>NEW</h5>
          <div className="itemInfor">
            <FontAwesomeIcon icon={faHotel} className="iconStyle" />
            <button className="btnLeft" onClick={() => handleLink("newHotel")}>
              New Hotel
            </button>
          </div>
          <div className="itemInfor">
            <FontAwesomeIcon icon={faRestroom} className="iconStyle" />
            <button className="btnLeft" onClick={() => handleLink("newRoom")}>
              New Room
            </button>
          </div>
        </div>
        <div style={{ margin: "15px 0" }}>
          <h5>USER</h5>
          <div className="itemInfor">
            <FontAwesomeIcon icon={faRightFromBracket} className="iconStyle" />
            <button className="btnLeft" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
