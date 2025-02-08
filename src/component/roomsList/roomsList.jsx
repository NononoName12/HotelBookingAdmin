import { useState, useEffect } from "react";
import "./roomsList.css";
import { useNavigate } from "react-router-dom";

const RoomsList = ({ rooms, loading }) => {
  const navigate = useNavigate();
  const [documentsRooms, setDocumentsRooms] = useState(rooms);

  console.log(documentsRooms);
  console.log(rooms);

  useEffect(() => {
    if (rooms) {
      setDocumentsRooms(rooms);
    }
  }, [rooms]);

  const handleDelete = async (id) => {
    //Hiển thị thông báo xác nhận
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://hotelbookingserver-877m.onrender.com/admin/rooms/${id}`,
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
          setDocumentsRooms((prevDocuments) =>
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
    navigate("/newRoom");
  };

  const handleEdit = (id) => {
    navigate(`/editRoom/${id}`);
  };

  return (
    <div className="containers">
      <div className="containerHotels">
        <h2>Rooms List</h2>
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
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Max People</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documentsRooms &&
                documentsRooms.map((item) => {
                  return (
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <th>{item._id}</th>
                      <th>{item.title}</th>
                      <th>{item.desc}</th>
                      <th>{item.price}</th>
                      <th>{item.maxPeople}</th>
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

export default RoomsList;
