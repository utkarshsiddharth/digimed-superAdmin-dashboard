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
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  useAddAdminMutation,
  useOrganizationkListQuery,
} from "../../../../redux/api/superAdmin";
import AnimatedLogo from "../../../../components/AnimatedLogo";
import { useForm } from "react-hook-form";
import Admin from "../admin/Admin";

const Organization = ({ SearchData }: any) => {
  const [organization, setOrganization] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [adminadd, setadminAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { register, handleSubmit,reset } = useForm();
  const [selectedId, setSelectedId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const limit = 10;
  const { data, isLoading } = useOrganizationkListQuery({
    page,
    limit,
    key: SearchData,
  });
    // Function to toggle the text visibility
    const handleToggleText = () => {
      setIsTextVisible(!isTextVisible);
    };
  

  const [addAdmin] = useAddAdminMutation();
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
  const onSubmit = async (data: any) => {
    data.organization_id = selectedId;

    setLoader(true);
    try {
      const response: any = await addAdmin(data);
 
      if (response?.data) {
        reset()
        setLoader(false);
        setadminAdd(false);
        setModalShow(true);
      }
      if (response?.error?.data?.message) {
        //@ts-ignore
        console.error("Error:", response?.error.data.message);
        //@ts-ignore
        alert("Error: " + response?.error.data.message);
      }

      setadminAdd(false);
    } catch (err) {
      //  alert("somthing went wrong..")
      console.error("Error:", err);
    } finally {
      setLoader(false);
    }
  };
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
                      <>
                        <tr
                          key={index}
                          className=""
                          onClick={() => {
                            setSelectedId(record?._id);
                            setModalShow(true);
                          }}
                          style={{ cursor: "pointer" }}
                        >
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
                      </>
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
      {/* style={{ height: isTextVisible ? "1vh" : "auto" }}   */}
         <Modal    
        backdrop={"static"}
        animation={false}
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
        keyboard={false}
        className="modal fade"
        size="xl"
      >
        <Modal.Header closeButton  >
          <Modal.Title as="h6">Admin List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* admin start  */}
          
          {/* amdin end  */}
          <Admin orgId={selectedId} setModalShow ={setModalShow} onToggleText={handleToggleText} />
        </Modal.Body>

        <Modal.Footer>
          <Col md={12} className="d-flex justify-content-end mt-3">
            <button
              // variant="primary"
              onClick={() => {
                setadminAdd(true);
                setModalShow(false);
              }}
              className=" border-0 bg-bluee rounded-2 py-2 px-4 fw-semibold fs-6 text-fixed-white"
              disabled={loader}
            >
              {loader ? (
                <button
                  className="border-0 blue-bg rounded-2 ms-2 px-4 fw-semibold fs-6 text-fixed-white bg-bluee"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm mx-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submit...
                </button>
              ) : (
                <span className="fs-15 fw-semibold">Add Admin</span>
              )}
            </button>
          </Col>
        </Modal.Footer>
      </Modal>
      
  
      {/* adminadd  */}
      <Modal
        backdrop={"static"}
        animation={false}
        centered
        show={adminadd}
        onHide={() => setadminAdd(false)}
        keyboard={false}
        className="modal fade"
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Add Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xl={12} className="mt-2">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  className=""
                  placeholder="Enter Admin Email ID"
                  aria-label="Email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </Col>

              <Col md={12} className="mt-2">
                <Form.Label>Password</Form.Label>
                <InputGroup className="">
                  <Form.Control
                    className="form-control"
                    placeholder="Enter Admin Password"
                    aria-label="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Col md={12} className="d-flex justify-content-end mt-3">
              <button
                //  variant="primary"
                onClick={() => {
                  setadminAdd(true);
                }}
                className=" border-0 bg-bluee rounded-2 py-2 px-4 fw-semibold fs-6 text-fixed-white"
                disabled={loader}
              >
                {loader ? (
                  <button
                    className="border-0 blue-bg rounded-2 ms-2 px-4 fw-semibold fs-6 text-fixed-white bg-bluee"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm mx-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submit...
                  </button>
                ) : (
                  <span className="fs-15 fw-semibold">Sumbit</span>
                )}
              </button>
            </Col>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default Organization;
