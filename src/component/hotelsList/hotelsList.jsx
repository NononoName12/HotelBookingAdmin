import { useState, useEffect } from "react";
import "./hotelsList.css";
import { useNavigate } from "react-router-dom";

const HotelList = ({ hotels, loading }) => {
  const navigate = useNavigate();
  const [documentsHotels, setDocumentsHotels] = useState(hotels);

  console.log(documentsHotels);
  console.log(hotels);

  // Cập nhật documentsHotels khi hotels thay đổi
  useEffect(() => {
    if (hotels) {
      setDocumentsHotels(hotels);
    }
  }, [hotels]);

  const handleDelete = async (id) => {
    // Hiển thị thông báo xác nhận
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://hotelbookingserver-877m.onrender.com/admin/hotels/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Nếu cần gửi cookie
          }
        );
        const data = await response.json();
        if (response.ok) {
          // Cập nhật lại danh sách document bằng cách loại bỏ document vừa xóa
          setDocumentsHotels((prevDocuments) =>
            prevDocuments.filter((doc) => doc._id !== id)
          );
        } else {
          const err = window.confirm(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddNew = () => {
    navigate("/newHotel");
  };

  const handleEdit = (id) => {
    navigate(`/editHotel/${id}`);
  };

  return (
    <div className="containers">
      <div className="containerHotels">
        <h2>Hotels List</h2>
        <button onClick={handleAddNew}>Add New</button>
      </div>
      {loading ? (
        <p style={{ fontSize: "15px" }}>Loading...</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Title</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documentsHotels &&
                documentsHotels.map((item) => {
                  return (
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <th>{item._id}</th>
                      <th>{item.name}</th>
                      <th>{item.type}</th>
                      <th>{item.title}</th>
                      <th>{item.city}</th>
                      <th>
                        <button
                          className="btnEdit"
                          onClick={() => handleEdit(item._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btnDelete"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HotelList;
