const Transactions = ({ transactions }) => {
  console.log(transactions);
  return (
    <div className="tableResult">
      <h2>Lastest Transactions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>ID</th>
            <th>User</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map((item) => {
              return (
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{item._id}</td>
                  <td>{item.user}</td>
                  <td>{item.hotel.name}</td>
                  {item.room && (
                    <td>
                      {item.room
                        .flatMap((room) => room.numberRoom) // Lấy tất cả số phòng từ từng room
                        .join(", ")}{" "}
                    </td>
                  )}
                  <td>
                    {item.dateStart} - {item.dateEnd}
                  </td>
                  <td>${item.price}</td>
                  <td>{item.payment}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
