import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./page/auth/singin";
import Dashboard from "./page/home/Dashboard";
import HotelDashboard from "./page/HotelDashboard/HotelDashboard";
import NewHotel from "./page/NewHotel/NewHotel";
import RoomDashboard from "./page/RoomDashboard/RoomDashboard";
import NewRoom from "./page/NewRoom/NewRoom";
import TransactionDashboard from "./page/TransactionDashboard/TransactionDashboard";
import EditHotel from "./page/EditHotel/EditHotel";
import EditRoom from "./page/EditRoom/EditRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/hotelsDashboard" element={<HotelDashboard />} />
        <Route path="/newHotel" element={<NewHotel />} />
        <Route path="/editHotel/:idEdit" element={<EditHotel />} />
        <Route path="/editRoom/:idEdit" element={<EditRoom />} />
        <Route path="/roomsDashboard" element={<RoomDashboard />} />
        <Route path="/newRoom" element={<NewRoom />} />
        <Route
          path="/transactionsDashboard"
          element={<TransactionDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
