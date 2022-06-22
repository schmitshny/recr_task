import "./App.css";
import {
  Route,
  Redirect,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ProductType from "./models/product";
import Table from "./components/Table";
import { Alert } from "@mui/material";
import Pagination from "./components/Pagination";
import FilterInput from "./components/FilterInput";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<ProductType[]>([]);
  const [error, setError] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const filterId = queryParams.get("filter");
  const pageNumber = queryParams.get("page");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch("https://reqres.in/api/products");
      if (!response.ok) {
        setError(true);
        // throw new Error("Something went wrong!");
        setIsLoading(false);
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

  const paginateHandler = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber);
      history.push(
        `/products?filter=${searchId ? searchId : ""}&page=${pageNumber}`
      );
    },
    [history, searchId]
  );

  const changePageHandler = (changeValue: number) => {
    if (
      (changeValue > 0 && currentPage < numberOfPages) ||
      (changeValue < 0 && currentPage > 1)
    ) {
      setCurrentPage((prevPageNumber) => {
        return prevPageNumber + changeValue;
      });
      history.push(
        `/products?filter=${searchId ? searchId : ""}&page=${
          currentPage + changeValue
        }`
      );
    }
  };

  const onFilterHandler = useCallback(
    (id: string) => {
      setSearchId(id);

      if (id !== "") {
        history.push(
          `/products?filter=${id}&page=${pageNumber ? pageNumber : currentPage}`
        );

        const filteredProduct = products.filter(
          (product) => product.id === +id
        );
        setSearchResult(filteredProduct);
      } else {
        setSearchResult(products);
        history.push(`/products`);
      }
    },
    [history, products, pageNumber, currentPage]
  );

  useEffect(() => {
    if (filterId) {
      setSearchId(filterId);
      onFilterHandler(filterId);
    }
    if (pageNumber) {
      paginateHandler(+pageNumber);
    }
  }, [filterId, pageNumber, onFilterHandler, paginateHandler]);

  if (IsLoading) {
    return <Alert severity="info">Loading...</Alert>;
  }

  if (error) {
    return <Alert severity="error">Something went wrong!</Alert>;
  }

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/products" />
        </Route>
        <Route path="/products">
          <main>
            <FilterInput onFilter={onFilterHandler} />
            <Table
              products={searchId.length < 1 ? currentProducts : searchResult}
            />
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={
                +searchId < 1 ? products.length : searchResult.length
              }
              currentPage={currentPage}
              paginate={paginateHandler}
              changePage={changePageHandler}
            />
          </main>
        </Route>

        <Route path="*">
          <Alert severity="error">Page not found!</Alert>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
