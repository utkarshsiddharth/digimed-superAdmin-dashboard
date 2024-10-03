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
  Form,
  Modal,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  useActiveStatusMutation,
  useDoctorksingalDataQuery,
  useKioskListQuery,
  useUpdateKioskProfileDataMutation,
} from "../../../../redux/api/superAdmin";
import AnimatedLogo from "../../../../components/AnimatedLogo";
import { useForm } from "react-hook-form";

const Koisk = ({ SearchData }: any) => {
  const [selectedId, setSelectedId] = useState(null);
  const [showpass, setShowpass] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [kiosksList, setKioskList] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;
  const { data, isLoading, isSuccess, refetch } = useKioskListQuery({
    page,
    limit,
    type: "kiosks",
  });

  const [changeStatus, { isLoading: changeLoading }] =
    useActiveStatusMutation();
  const {
    data: sinaglData,
    isError,
    isSuccess: success,
  } = useDoctorksingalDataQuery({ data: "kiosks", selectedId });
  const [updateKioskProfile] = useUpdateKioskProfileDataMutation();
  const [showConfirm, setShowConfirm] = useState(false)
  const [, setProfileData] = useState({});
  const [suspendedId,setSuspendedId] = useState<any>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (data) {
      setKioskList(data?.data?.data);
      const totalPatients = data?.data?.total || 0;
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

  useEffect(() => {
    console.log(sinaglData);
    if (success && sinaglData?.data) {
      setProfileData(sinaglData?.data);
      setValue("name_of_center", sinaglData.data.name_of_center || "");
      setValue("address", sinaglData.data.address || "");
      setValue("district", sinaglData.data.district || "");
      setValue("state", sinaglData.data.state || "");
      setValue("email_id", sinaglData.data.email_id || "");
      setValue("city", sinaglData.data.city || "");
      setValue("username", sinaglData.data.username || "");
      setValue("country", sinaglData.data.country || "");
      setValue("pincode", sinaglData.data.pincode || "");
      setValue("phone_number", sinaglData.data.phone_number || "");
      setValue("password", "");
    } else if (isError) {
      console.error("Failed to fetch profile data:", isError);
    }
  }, [success, isError, sinaglData, setValue]);
  const onSubmit = async (formData: any) => {
    try {
      setLoader(true);
      const response = await updateKioskProfile({ formData, selectedId });
      setModalShow(false);
      if (response?.error) {
        console.error("Error updating profile:", response.error);
      } else {
        console.log("Profile updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoader(false);
    }
  };
  const handleClose = () => setShowConfirm(false);

  const handlStatus = async () => {
    setShowConfirm(true)
    const statusData = {
      user_type: "kiosk",
      status:
        suspendedId?.resume_suspended_status === "active" ? "suspended" : "active",
    };

    try {
      const response = await changeStatus({
        statusData,
        userStatus: suspendedId?._id,
      });

      setShowConfirm(false)
      if (response?.error) {
        console.error("Error change status:", response.error);
      } else {
        console.log("change status successfully:", response.data);
        refetch();
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  if (!data || !data.data || !data.data.data) {
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
        {changeLoading && <AnimatedLogo />}
      </div>
      <Modal
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
        keyboard={false}
        className="modal fade"
        size="xl"
      >
        {/* onSubmit={handleSubmit1(onSubmit1)} */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Update kiosk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} className="mb-3">
                <Form.Label className="">Center Name</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your Center Name"
                  aria-label="First name"
                  {...register("name_of_center", { required: true })}
                />
              </Col>
              {errors.name_of_center && (
                <span className="text-white">This field is required</span>
              )}
              <Col md={6} className="mb-3">
                <Form.Label className="">Address</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your Address line 1"
                  aria-label="Last name"
                  {...register("address", { required: true })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="">District</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your Address Line 2"
                  aria-label="Last name"
                  {...register("district", { required: true })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="">Country </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your Country Name"
                  aria-label="Last name"
                  {...register("country", { required: true })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="">State</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your State Name"
                  aria-label="Last name"
                  {...register("state", { required: true })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="">City</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your City Name"
                  aria-label="Last name"
                  {...register("city", { required: true })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="">Pin Code</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your Pin code"
                  aria-label="Last name"
                  {...register("pincode", { required: true })}
                />
              </Col>
              <Col xl={6} className="mb-3">
                <Form.Label className="">Email ID</Form.Label>
                <Form.Control
                  type="email"
                  className=""
                  placeholder="Enter your Email ID"
                  aria-label="email"
                  {...register("email_id", { required: true })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label className="">Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  className=""
                  placeholder="Enter your Mobile Number"
                  aria-label="Phone number"
                  {...register("phone_number", { required: true })}
                />
              </Col>

              <Col md={6}>
                <Form.Label className="">User Name</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your User Name"
                  aria-label="First name"
                  {...register("username", { required: true })}
                />
              </Col>
              <Col md={6}>
                <Form.Label className="mb-3">Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type={showpass ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your Password"
                    aria-label="Last name"
                    {...register("password", { required: true })}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Col md={12} className="d-flex justify-content-end mt-3">
              <button
                className="border-0 bg-bluee rounded-2 py-2 fw-semibold fs-6 text-fixed-white button"
                disabled={loader}
              >
                {loader ? (
                  <button
                    className="border-0 blue-bg text-fixed-white rounded-1"
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
                  <button className="border-0 bg-bluee text-fixed-white rounded-2 fw-bold fs-6">
                    Submit
                  </button>
                )}
              </button>
            </Col>
          </Modal.Footer>
        </form>
      </Modal>

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
                        City
                      </td>
                      <td scope="col" className="fw-bold">
                        Action
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {SearchData
                      ? SearchData.map((item: any, index: any) => (
                          <tr key={index} className="">
                            <td scope="row" className="">
                              {(page - 1) * limit + index + 1}.
                            </td>
                            <td className="">{item?.name_of_center}</td>
                            <td className="">{item?.date_of_kiosk_added}</td>
                            <td className="">{item?.city}</td>
                            <td className="d-flex gap-3">
                              <span>
                                <span
                                  onClick={() => {
                                    setShowConfirm(true)
                                    setSuspendedId(item)
                                  }}
                                >
                                  {item?.resume_suspended_status ===
                                  "active" ? (
                                    <i className="bi bi-play-circle fs-3"></i>
                                  ) : (
                                    <i className="bi bi-pause-circle fs-3"></i>
                                  )}
                                </span>
                              </span>
                              <span
                                onClick={() => {
                                  setModalShow(true);
                                  setSelectedId(item?._id);
                                }}
                              >
                                <i className="bi bi-pencil-square fs-4"></i>
                              </span>
                            </td>
                          </tr>
                        ))
                      : isSuccess &&
                        kiosksList?.map((record: any, index: any) => (
                          <tr key={index} className="">
                            <td scope="row" className="">
                              {(page - 1) * limit + index + 1}.
                            </td>
                            <td className="">{record?.name_of_center}</td>
                            <td className="">{record?.date_of_kiosk_added}</td>
                            <td className="">
                              {record?.city
                                ? record.city.charAt(0).toUpperCase() +
                                  record.city.slice(1)
                                : ""}
                            </td>
                            <td className="d-flex gap-3">
                              <span>
                                <span
                                  onClick={() => {
                                    setShowConfirm(true)
                                    setSuspendedId(record)
                                   
                                  }}
                                >
                                  {record?.resume_suspended_status ===
                                  "active" ? (
                                    <i className="bi bi-play-circle fs-3"></i>
                                  ) : (
                                    <i className="bi bi-pause-circle fs-3"></i>
                                  )}
                                </span>
                              </span>
                              <span
                                onClick={() => {
                                  setModalShow(true);
                                  setSelectedId(record?._id);
                                }}
                              >
                                <i className="bi bi-pencil-square fs-4"></i>
                              </span>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </Table>
              </div>
              <Modal show={showConfirm} onHide={handleClose} centered 
              backdrop ={"static"}
              animation={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 <h5> Are you sure you want to suspend this doctor?</h5>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handlStatus} >
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
            </CardBody>
            <CardFooter className="d-flex justify-content-end align-items-center">
              {kiosksList?.length > 0 && (
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
                      disabled={page >= totalPages}
                      active={page < totalPages ? true : false}
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

export default Koisk;
