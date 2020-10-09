import React from "react";

// reactstrap components
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginations = ({
  providersPerPage,
  totalProviders,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProviders / providersPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePreviousClick = (e) => {
    e.preventDefault();
    paginate(currentPage - 1);
  };
  const handleNextClick = (e) => {
    e.preventDefault();
    paginate(currentPage + 1);
  };
  const handleFirstClick = (e) => {
    e.preventDefault();
    paginate(1);
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <Pagination
          className="pagination justify-content-center"
          listclassName="justify-content-center"
        >
          {currentPage > 1 ? (
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={handleFirstClick}
                tabindex="-1"
                style={{ color: "black" }}
              >
                First
              </PaginationLink>
            </PaginationItem>
          ) : null}

          {currentPage > 1 ? (
            <PaginationItem>
              <PaginationLink
                href="#pablo"
                onClick={handlePreviousClick}
                tabindex="-1"
                style={{ color: "black" }}
              >
                Previous
              </PaginationLink>
            </PaginationItem>
          ) : null}
          {pageNumbers.map((number) => (
            <PaginationItem key={number} className="page-item active">
              <PaginationLink
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number} <span className="sr-only">(current)</span>
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              href="#pablo"
              onClick={handleNextClick}
              style={{ color: "black" }}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    </>
  );
};

export default Paginations;
