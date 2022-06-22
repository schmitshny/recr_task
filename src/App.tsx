import "./App.css";
import { useState, useEffect } from "react";
import ProductType from "./models/product";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import FilterInput from "./components/FilterInput";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch("https://reqres.in/api/products");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setProducts(responseData.data);
      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      console.log(error);
    });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const numberOfPages = Math.ceil(products.length / productsPerPage);

  const paginateHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const changePageHandler = (changeValue: number) => {
    if (
      (changeValue > 0 && currentPage < numberOfPages) ||
      (changeValue < 0 && currentPage >= 1)
    ) {
      setCurrentPage((prevPageNumber) => {
        return prevPageNumber + changeValue;
      });
    }
  };

  const onFilterHandler = (id: string) => {
    setSearchId(id);
    if (id !== "") {
      const filteredProduct = products.filter((product) => product.id === +id);
      setSearchResult(filteredProduct);
    } else {
      setSearchResult(products);
    }
  };

  if (IsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <FilterInput onFilter={onFilterHandler} />
      <Table products={searchId.length < 1 ? currentProducts : searchResult} />
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        currentPage={currentPage}
        paginate={paginateHandler}
        changePage={changePageHandler}
      />
    </main>
  );
}

export default App;
