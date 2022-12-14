const TableRow = ({ latitude, longitude, date }) => {
  return (
    <tr>
      <td>{latitude}</td>
      <td>{longitude}</td>
      <td>{date}</td>
    </tr>
  );
};

export default TableRow;
