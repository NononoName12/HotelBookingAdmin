import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import InputForm from "../inputForm/inputForm";
import "./formEditRoom.css";

const FormEditRoom = ({ rooms }) => {
  const { idEdit } = useParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    seclectHotel: "",
    rooms: "",
    maxPeople: "",
    hotelPrev: "",
  });

  // Cập nhật formData khi hotels có dữ liệu mới
  useEffect(() => {
    // console.log(rooms.room);
    if (rooms) {
      const roomNumber = rooms.room.roomNumbers.join(", ");
      // const roomTitles = hotels.rooms.map((room) => room.title);
      // const titles = roomTitles.join("\n"); // Gộp các title thành chuỗi, mỗi title trên 1 dòng
      // const imageArr = hotels.photos.map((photo) => photo);
      // const images = imageArr.join("\n");
      setFormData({
        title: rooms.room.title || "",
        description: rooms.room.desc || "",
        price: rooms.room.price || "",
        seclectHotel: rooms.hotel._id || "",
        rooms: roomNumber || "",
        maxPeople: rooms.room.maxPeople || "",
        hotelPrev: rooms.hotel._id || "",
      });
    }
  }, [rooms]); // Chỉ chạy khi hotels thay đổi

  // Hàm xử lý khi có thay đổi ở các input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn reload trang

    console.log(formData); // In ra dữ liệu form
    try {
      const response = await fetch(
        `https://hotelbookingserver-877m.onrender.com/admin/edit-rooms/${idEdit}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Chỉ định định dạng dữ liệu
          },
          body: JSON.stringify(formData), // Chuyển đổi đối tượng dữ liệu thành chuỗi JSON
          credentials: "include", // Nếu cần gửi cookie
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Response data:", responseData);
      navigate("/roomsDashboard");
      return responseData;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          "https://hotelbookingserver-877m.onrender.com/admin/hotels",
          {
            method: "GET",
            credentials: "include", // Bao gồm cookie trong yêu cầu
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setHotels(jsonData.hotels);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <form className="containerFormNewRoom" onSubmit={handleSubmit}>
      <div className="containerAddNew">
        <h1>Edit Room</h1>
      </div>
      <div className="containerFormInput formRoom">
        <div className="groupInputTop">
          <div>
            <InputForm
              label="Title"
              placeholder="2 bed room"
              require={true}
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <InputForm
              label="Price"
              placeholder="100"
              require={true}
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputForm
              label="Description"
              placeholder="Hing size bed, 1 bathroom"
              require={true}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <InputForm
              label="Max People"
              placeholder="2"
              require={true}
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="containerBotForm">
          <div className="inputImage">
            <label htmlFor="rooms">Rooms</label>
            <textarea
              className="inputImage-input"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              required
              placeholder="give comma between room numbers"
            />
          </div>
          <div className="seclectHotel">
            <label htmlFor="seclectHotel">Hotel</label>
            <select
              name="seclectHotel"
              value={formData.seclectHotel}
              onChange={handleChange}
              required
            >
              {rooms && rooms.hotel ? (
                <option value={rooms.hotel._id}>{rooms.hotel.name}</option>
              ) : (
                <option value=""></option>
              )}

              {rooms &&
                hotels &&
                hotels
                  .filter((hotel) => hotel.name !== rooms.hotel.name) // Loại trừ option đầu tiên nếu cần
                  .map((hotel) => (
                    <option key={hotel._id} value={hotel._id}>
                      {hotel.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className="btnSend">
            <button type="submit">Update</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormEditRoom;
