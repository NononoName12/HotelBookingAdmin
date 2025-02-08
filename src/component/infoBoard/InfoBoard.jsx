import {
  faCartShopping,
  faUser,
  faCalculator,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoBoard = ({ stats }) => {
  return (
    <div className="containerCard">
      <div className="card">
        <h5>USERS</h5>
        <span>{stats.userCount}</span>
        <FontAwesomeIcon
          icon={faUser}
          className="iconStyle"
          style={{ backgroundColor: "#fcc2d7", color: "#d6336c" }}
        />
      </div>
      <div className="card">
        <h5>ORDERS</h5>
        <span>{stats.transactionCount}</span>
        <FontAwesomeIcon
          icon={faCartShopping}
          className="iconStyle"
          style={{ backgroundColor: "#ffec99", color: "#f59f00" }}
        />
      </div>
      <div className="card">
        <h5>EARNINGS</h5>
        <span>${stats.totalRevenue}</span>
        <FontAwesomeIcon
          icon={faCircleDollarToSlot}
          className="iconStyle"
          style={{ backgroundColor: "#b2f2bb", color: "#37b24d" }}
        />
      </div>
      <div className="card">
        <h5>BALANCE</h5>
        <span>${stats.avgMonthlyRevenue}</span>
        <FontAwesomeIcon
          icon={faCalculator}
          className="iconStyle"
          style={{ backgroundColor: "#eebefa", color: "#ae3ec9" }}
        />
      </div>
    </div>
  );
};

export default InfoBoard;
