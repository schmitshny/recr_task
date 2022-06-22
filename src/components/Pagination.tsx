import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.css";

const Pagination2: React.FC<{
  productsPerPage: number;
  totalProducts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  changePage: (changeValue: number) => void;
}> = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
  changePage,
}) => {
  const pageNumber: number[] = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <Pagination>
        <Pagination.Prev onClick={() => changePage(-1)} />
        {pageNumber.map((number) => (
          <Pagination.Item
            key={number}
            onClick={() => paginate(number)}
            active={number === currentPage}
          >
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => changePage(1)} />
      </Pagination>
    </nav>
  );
};

export default Pagination2;

// <a href="!#" onClick={() => paginate(number)}>
// {number}
// </a>
