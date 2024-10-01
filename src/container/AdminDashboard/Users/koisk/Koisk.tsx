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
} from "../../../../redux/api/admin";
import AnimatedLogo from "../../../../components/AnimatedLogo";
import { useForm } from "react-hook-form";

const Koisk = ({ SearchData }: any) => {
  const [selectedId, setSelectedId] = useState(null);
  const [showpass, setShowpass] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { data, isLoading, isSuccess, refetch } = useKioskListQuery("kiosks");
  const [changeStatus,{ isLoading: changeLoading }] = useActiveStatusMutation()
  const {
    data: sinaglData,
    isError,
    isSuccess: success,
  } = useDoctorksingalDataQuery({ data: "kiosks", selectedId });
  const [updateKioskProfile] = useUpdateKioskProfileDataMutation();
  const [cpagination, setCpagination] = useState(1);
  const recordsPerPage = 5;
  const [, setProfileData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

 
  useEffect(() => {
    console.log(sinaglData)
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
      setValue("password", sinaglData.data.password || "");
    } else if (isError) {
      console.error("Failed to fetch profile data:", isError);
    }
  }, [success, isError, sinaglData, setValue]);
  const onSubmit = async (formData: any) => {
    try {
      setLoader(true);
      const response = await updateKioskProfile({ formData, selectedId });
      setModalShow(false)
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


  const [userStatus, setUserStatus] = useState();

  const [userActive, setUserActive] = useState();
  const [ModalShowStatue, setModalShowStatue] = useState(false)



  console.log(userStatus);
  const handlStatus = async (record:any) => {

    const statusData = { "user_type": "kiosk", "status": record?.resume_suspended_status === "active" ? "suspended" : "active" }

    try {
      const response = await changeStatus({ statusData, userStatus: record?._id });

      console.log("jfgjhdf dsgjf", response)
      if (response?.error) {
        console.error("Error change status:", response.error);
      } else {
        console.log("change status successfully:", response.data);
        refetch()
      }

    } catch (error) {
      console.error("Error during submission:", error);

    }
  }

  if (!data || !data.data || !data.data.data) {
    return <div> {isLoading && <AnimatedLogo />}</div>;
  }
  const totalRecords = data.data.data.length;
  const lastIndex = cpagination * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.data.data.slice(firstIndex, lastIndex);

  const npage = Math.ceil(totalRecords / recordsPerPage);
  const number = [...Array(npage).keys()].map((num) => num + 1);
  function prePage() {
    if (cpagination > 1) {
      setCpagination(cpagination - 1);
    }
  }
  function changeCpage(id: any) {
    setCpagination(id);
  }
  function nextPage() {
    if (cpagination < npage) {
      setCpagination(cpagination + 1);
    }
  }


  return (
    <Fragment>
       <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex:999
        }}
        className="d-flex justify-content-center align-items-center"
      >
        {isLoading && <AnimatedLogo />}
        {changeLoading && <AnimatedLogo/>}

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
            <Modal.Title as="h6">Add kiosk</Modal.Title>
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
              {errors.name_of_center && <span className="text-white">This field is required</span>}
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
                  <Button
                    className=" border-0 bg-bluee rounded-2 py-2 fw-semibold fs-6 text-fixed-white button color-white"
                    onClick={() => setShowpass(!showpass)}
                  >
                    {showpass ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      // style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
                      >
                        <path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path>
                        <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
                      >
                        <path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"></path>
                      </svg>
                    )}
                  </Button>
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
                      <td scope="col" className="fw-bold">S.No</td>
                      <td scope="col" className="fw-bold">Name</td>
                      <td scope="col" className="fw-bold">Add Date</td>
                      <td scope="col" className="fw-bold">City</td>
                      <td scope="col" className="fw-bold">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {SearchData
                      ? SearchData.map((item: any, index: any) => (
                        <tr key={index} className="">
                          <td scope="row" className="">{firstIndex + index + 1}.</td>
                          <td className="">{item?.name_of_center}</td>
                          <td className="">
                            {item?.date_of_kiosk_added}
                          </td>
                          <td className="">{item?.city}</td>
                          <td className="d-flex gap-3">
                            <span>
                              <span>
                                {item?.status === "active" ? (
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
                      records.map((record: any, index: any) => (
                        <tr key={index} className="">
                          <td scope="row" className="">{firstIndex + index + 1}.</td>
                          <td className="">{record?.name_of_center}</td>
                          <td className="">
                            {record?.date_of_kiosk_added}
                          </td>
                          <td className="">
                            {record?.city
                              ? record.city.charAt(0).toUpperCase() +
                              record.city.slice(1)
                              : ""}
                          </td>
                          <td className="d-flex gap-3">
                            <span>

                              <span onClick={() => {
                                handlStatus(record);

                              }}>
                                {
                                  record?.resume_suspended_status === "active" ? (
                                    <i className="bi bi-play-circle fs-3"></i>
                                  ) : (
                                    <i className="bi bi-pause-circle fs-3"></i>
                                  )
                                }
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
            </CardBody>
            <CardFooter className="d-flex justify-content-between align-items-center">
              <div className="fs-15 fw-bold mt-3">
                Showing {firstIndex + 1} to {lastIndex} of {totalRecords}{" "}
                Entries
              </div>
              <Pagination className="m-0">
                <Pagination.Prev onClick={prePage} disabled={cpagination === 1}>
                  Previous
                </Pagination.Prev>
                {number.map((n) => (
                  <Pagination.Item
                    key={n}
                    active={n === cpagination}
                    onClick={() => changeCpage(n)}
                  >
                    {n}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={nextPage}
                  disabled={cpagination === npage}
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Koisk;
