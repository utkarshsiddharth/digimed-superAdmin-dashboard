/* eslint-disable linebreak-style */
import { Fragment, useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Card,
  Pagination,
  CardBody,
  CardFooter,
} from "react-bootstrap";
import { useOrganizationkListQuery } from "../../../../redux/api/superAdmin";
import AnimatedLogo from "../../../../components/AnimatedLogo";

const Organization = ({ SearchData }: any) => {
  const [organization, setOrganization] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10
  ;
  const { data, isLoading } = useOrganizationkListQuery({
    page,
    limit,
    key: SearchData,
  });
  console.log("org data", data);

  useEffect(() => {
    if (data) {
      setOrganization(data?.data?.organizations);
      const totalPatients = data?.data?.totalData || 0;

      setTotalPages(Math.ceil(totalPatients / limit));
    }
  }, [data]);

  // pagination
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (isLoading) {
    return <div> {isLoading && <AnimatedLogo />}</div>;
  }

  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 999,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        {isLoading && <AnimatedLogo />}
      </div>

      <Row>
        <Col>
          <div style={{ position: "absolute" }}></div>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table text-nowrap border-success">
                  <thead>
                    <tr>
                      <td scope="col" className="fw-bold">
                        S.No
                      </td>
                      <td scope="col" className="fw-bold">
                        Name
                      </td>
                      <td scope="col" className="fw-bold">
                        Add Date
                      </td>
                      <td scope="col" className="fw-bold">
                        Organization Email
                      </td>
                      <td scope="col" className="fw-bold">
                        Address
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {organization?.map((record: any, index: any) => (
                      <tr key={index} className="">
                        <td scope="row" className="">
                          {(page - 1) * limit + index + 1}.
                        </td>
                        <td className="">{record?.name}</td>
                        <td className="">
                          {new Date(record?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="">{record?.email}</td>
                        <td className="">{record?.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
            <CardFooter className="d-flex justify-content-end align-items-center">
              {organization?.length > 0 && (
                <nav aria-label="Page navigation">
                  <Pagination className="justify-content-end m-2">
                    <Pagination.Item
                      onClick={handlePrevious}
                      disabled={page <= 1}
                      active={page > 1 ? true : false}
                    >
                      Previous
                    </Pagination.Item>
                    {page > 3 && (
                      <>
                        <Pagination.Item onClick={() => setPage(1)}>
                          1
                        </Pagination.Item>
                        <Pagination.Item disabled>...</Pagination.Item>
                      </>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .slice(
                        Math.max(0, page - 3),
                        Math.min(totalPages, page + 2)
                      )
                      .map((pageNumber) => (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === page}
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      ))}
                    {page < totalPages - 2 && (
                      <>
                        <Pagination.Item disabled>...</Pagination.Item>
                        <Pagination.Item onClick={() => setPage(totalPages)}>
                          {totalPages}
                        </Pagination.Item>
                      </>
                    )}
                    <Pagination.Item
                      onClick={handleNext}
                    //   disabled={page >= totalPages}
                    //   active={page < totalPages ? true : false}
                    >
                      Next
                    </Pagination.Item>
                  </Pagination>
                </nav>
              )}
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Organization;
