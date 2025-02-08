import React, { useState, useEffect } from "react";
import "./EditHotel.css";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import InfoBoard from "../../component/infoBoard/InfoBoard";
import Transactions from "../../component/transaction/transaction";
import HotelList from "../../component/hotelsList/hotelsList";
import FormEditHotel from "../../component/formEditHotel/formEditHotel";

const EditHotel = () => {
  const { idEdit } = useParams();

  const navigate = useNavigate();
  const [hotels, setHotels] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          `https://hotelbookingserver-877m.onrender.com/admin/edit-hotels/${idEdit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Nếu cần gửi cookie
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            // Nếu nhận được mã lỗi 401, chuyển hướng đến trang login
            navigate("/login"); // Thay đổi đường dẫn đến trang đăng nhập của bạn
          } else if (response.status === 403) {
            // Nếu nhận được mã lỗi 403, chuyển hướng đến trang login
            navigate("/login", {
              state: { message: "This account does not have access rights" },
            }); // Thay đổi đường dẫn đến trang đăng nhập của bạn
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
            return;
          }
        }

        const data = await response.json();
        setHotels(data);
        console.log(data);
        setErrorMessage(null); // Clear error nếu có dữ liệu
      } catch (error) {
        setErrorMessage("Failed to fetch edit hotel.");
      }
    };

    fetchHotels(); // Gọi API để lấy thông tin chi tiết khách sạn
  }, []);

  return (
    <div className="container">
      <table className="containerTable">
        <tbody>
          <tr>
            <td
              className="column1 adminPage"
              style={{ color: "#1c7ed6", fontWeight: "bold" }}
            >
              <h2>Admin Page</h2>
            </td>
            <td className="column2"></td>
          </tr>
          <tr className="row2">
            <td className="column1">
              <Sidebar />
            </td>
            <td className="column2">
              <FormEditHotel hotels={hotels} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default EditHotel;
