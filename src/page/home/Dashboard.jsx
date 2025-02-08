import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import InfoBoard from "../../component/infoBoard/InfoBoard";
import Transactions from "../../component/transaction/transaction";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  console.log(stats);
  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true); // Bắt đầu loading
      try {
        const response = await fetch(
          `https://hotelbookingserver-877m.onrender.com/admin/stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Nếu cần gửi cookie
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            setErrorMessage(errorData.message);
            // Nếu nhận được mã lỗi 401, chuyển hướng đến trang login
            navigate("/login"); // Thay đổi đường dẫn đến trang đăng nhập của bạn
          } else if (response.status === 403) {
            // Nếu nhận được mã lỗi 403, chuyển hướng đến trang login
            navigate("/login", {
              state: { message: "This account does not have access rights" },
            }); // Thay đổi đường dẫn đến trang đăng nhập của bạn
          } else {
            setErrorMessage(errorData.message);
            return;
          }
        }

        const data = await response.json();
        setStats(data);
        console.log(data);
        setErrorMessage(null); // Clear error nếu có dữ liệu
      } catch (error) {
        setErrorMessage("Failed to fetch transactions.");
      } finally {
        setLoadingStats(false); // Kết thúc loading
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoadingTransactions(true);
      try {
        const response = await fetch(
          `https://hotelbookingserver-877m.onrender.com/admin/transactions`,
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
        setTransactions(data);
        console.log(data);
        setErrorMessage(null); // Clear error nếu có dữ liệu
      } catch (error) {
        setErrorMessage("Failed to fetch transactions.");
      } finally {
        setLoadingTransactions(false); // Kết thúc loading
      }
    };

    fetchTransactions(); // Gọi API để lấy thông tin chi tiết khách sạn
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
              {loadingStats ? (
                <p>Loading stats...</p>
              ) : (
                stats && <InfoBoard stats={stats} />
              )}
              {loadingTransactions ? (
                <p>Loading transactions...</p>
              ) : (
                <Transactions transactions={transactions} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;
