import React from "react";

// reactstrap components
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginations = ({ providersPerPage, totalProviders, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProviders / providersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav aria-label="Page navigation example">
        <Pagination
          className="pagination justify-content-center"
          listclassName="justify-content-center"
        >
          <PaginationItem>
            <PaginationLink
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              currentpage="-1"
            >
              <i className=" fa fa-angle-left"></i>
              <span className=" sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>
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
              aria-label="Next"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <i className=" fa fa-angle-right"></i>
              <span className=" sr-only">Next</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    </>
  );
};

export default Paginations;
