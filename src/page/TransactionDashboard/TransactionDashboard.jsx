import React, { useState, useEffect } from "react";
import "./TransactionDashboard.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../component/sidebar/sidebar";
import InfoBoard from "../../component/infoBoard/InfoBoard";
import Transactions from "../../component/transaction/transaction";
import TransactionList from "../../component/transactionList/transactionList";

const TransactionDashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const response = await fetch(
          `http://localhost:5000/admin/transactionsTotal`,
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
        setErrorMessage(null); // Clear error nếu có dữ liệu
      } catch (error) {
        setErrorMessage("Failed to fetch transactions.");
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };

    fetchTransactions();
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
              <TransactionList transactions={transactions} loading={loading} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default TransactionDashboard;
