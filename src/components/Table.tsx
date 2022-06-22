import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProductType from "../models/product";

const ProductTable: React.FC<{ products: ProductType[] }> = (props) => {
  return (
    <Table sx={{ maxWidth: 1000 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.products.map((row) => (
          <TableRow
            key={row.name}
            sx={{
              backgroundColor: `${row.color}`,
              "&:last-child td, &:last-child th": { border: 0 },
            }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>

            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.year}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;

// "&:last-child td, &:last-child th": { border: 0 }
