import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputForm from "../inputForm/inputForm";
import "./formNewHotel.css";

const FormNewHotel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    distance: "",
    description: "",
    images: "",
    type: "",
    address: "",
    title: "",
    price: "",
    featured: "false",
    rooms: "",
  });

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
      const response = await fetch("http://localhost:5000/admin/add-hotels", {
        method: "POST", // Hoặc 'PUT' nếu bạn muốn cập nhật dữ liệu
        headers: {
          "Content-Type": "application/json", // Chỉ định định dạng dữ liệu
        },
        body: JSON.stringify(formData), // Chuyển đổi đối tượng dữ liệu thành chuỗi JSON
        credentials: "include", // Nếu cần gửi cookie
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Response data:", responseData);
      navigate("/hotelsDashboard");
      return responseData;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <form className="containerFormNewHotel" onSubmit={handleSubmit}>
      <div className="containerAddNew">
        <h1>Add New Hotel</h1>
      </div>
      <div className="containerFormInput">
        <div className="groupInputTop">
          <div>
            <InputForm
              label="Name"
              placeholder="My Hotel"
              require={true}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputForm
              label="City"
              placeholder="New York"
              require={true}
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <InputForm
              label="Distance from City Center"
              placeholder="500"
              require={true}
              name="distance"
              value={formData.distance}
              onChange={handleChange}
            />
            <InputForm
              label="Description"
              placeholder="description"
              require={true}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="inputImage">
              <label htmlFor="images">Images</label>
              <textarea
                placeholder="Enter the link of the hotel image"
                className="inputImage-input"
                name="images"
                value={formData.images}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <InputForm
              label="Type"
              placeholder="hotel"
              require={true}
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
            <InputForm
              label="Address"
              placeholder="elton st, 216"
              require={true}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <InputForm
              label="Title"
              placeholder="The best Hotel"
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
            <div className="classFeatured">
              <label htmlFor="featured">Featured</label>
              <select
                name="featured"
                value={formData.featured}
                onChange={handleChange}
                required
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="inputImage">
          <label htmlFor="rooms">Rooms</label>
          <textarea
            placeholder="Enter the title of the room"
            name="rooms"
            rows="5"
            value={formData.rooms}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="btnSend">
          <button type="submit">Send</button>
        </div>
      </div>
    </form>
  );
};

export default FormNewHotel;
