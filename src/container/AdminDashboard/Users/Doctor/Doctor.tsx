/* eslint-disable linebreak-style */
import { Fragment, useState, useEffect } from "react";
import {
  Row,
  Table,
  Card,
  CardBody,
  Pagination,
  Modal,
  Col,
  Form,
  InputGroup,
  Button,
  CardFooter,
} from "react-bootstrap";
import {
  useActiveStatusMutation,
  useDoctorkListQuery,
  useDoctorksingalDataQuery,
  useUpdateDoctorProfileMutation,
} from "../../../../redux/api/superAdmin";
import AnimatedLogo from "../../../../components/AnimatedLogo";
import { useForm } from "react-hook-form";

const Doctor = ({ SearchData }: any) => {
  const [loader, setLoader] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showpass, setShowpass] = useState(false);
  const [suspendedId,setSuspendedId] = useState<any>("")
  const [doctorActive] = useActiveStatusMutation();
  const [updateDoctorProfile] = useUpdateDoctorProfileMutation();
  const [changeStatus, { isLoading: changeLoading }] = useActiveStatusMutation()
  const [kiosksList, setKioskList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const [, setProfileData] = useState({});
  const {
    data: sinaglData,
    isSuccess,
    isError,
  } = useDoctorksingalDataQuery({
    data: "doctors",
    selectedId,
  });
  const { data, isLoading, refetch } = useDoctorkListQuery( { page,
    limit,type:"doctors"});
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
    if (isSuccess) {
      console.log(sinaglData)
      setProfileData(sinaglData?.data);
      console.log("Profile data fetched successfully:", sinaglData?.data);
      setValue("first_name", sinaglData?.data?.first_name || "");
      setValue("last_name", sinaglData?.data?.last_name || "");
      setValue("date_of_birth", sinaglData?.data?.date_of_birth || "");
      setValue("registration_id", sinaglData?.data?.registration_id || "");
      setValue("gender", sinaglData?.data?.gender || "");
      setValue("email", sinaglData?.data?.email || "");
      setValue("landline_number", sinaglData?.data?.landline_number || "");
      setValue("mobile_number", sinaglData?.data?.mobile_number || "");
      setValue("site", sinaglData?.data?.site || "");
      setValue("user_name", sinaglData?.data?.user_name || "");
      setValue("password", "");
      setValue("biography", sinaglData?.data?.biography || "");
      if (
        sinaglData?.data?.professional_details &&
        sinaglData?.data?.professional_details.length > 0
      ) {
        setValue(
          "professional_details",
          sinaglData?.data?.professional_details[0]
        );
      }
      setValue("qualification", sinaglData?.data?.qualification || "");
      setValue("specialization", sinaglData?.data?.specialization || "");
    } else if (isError) {
      console.error("Failed to fetch profile data:", isError);
    }
  }, [isSuccess, isError, sinaglData, setValue]);

  const onSubmit = async (formData: any) => {
    setLoader(true);
    try {
      const response = await updateDoctorProfile({
        formData,
        selectedId,
      }).unwrap();
      setModalShow(false)
      console.log("Profile updated successfully:", response);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoader(false);
    }
  };



  const handleClose = () => setShowConfirm(false);


  const handlStatus = async () => {
    setShowConfirm(true)
    const statusData = { "user_type": "doctor", "status": suspendedId?.resume_suspended_status === "active" ? "suspended" : "active" }

    try {
      const response = await changeStatus({ statusData, userStatus: suspendedId?._id });
      setShowConfirm(false)
      if (changeLoading) {
        return
      }
      if (response?.error) {
        console.error("Error change status:", response.error);
      }

      else {
        console.log("change status successfully:", response.data);
        refetch()
      }

    } catch (error) {
      console.error("Error during submission:", error);

    }
  }



  const [isPlaying, setIsPlaying] = useState(false);
  const [iconState, setIconState] = useState({ user_type: "", status: "" });
  const [, setStorActive] = useState({ user_type: "", status: "" });
  const [active, setActive] = useState();
  const handleActive = (event: any) => {
    const value = event.currentTarget.getAttribute("values");
    const newIconState = { user_type: "doctor", status: value };
    setIconState(newIconState);
    setIsPlaying(!isPlaying);
    setStorActive(newIconState);
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("Icon State Updated:", iconState);
      try {
        const activeData = await doctorActive({
          id: active,
          formData: iconState,
        });
        console.log("Active data updated:", activeData);
      } catch (error) {
        console.error("Error fetching active data:", error);
      }
    };
    if (iconState.status) {
      fetchData();
    }
  }, [iconState]);

  return (
    <Fragment>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
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
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Update User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your First name"
                  aria-label="First name"
                  defaultValue={sinaglData?.data?.first_name}
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                />
                {errors.first_name && (
                  <span className="text-white">This field is required</span>
                )}
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your Last name"
                  aria-label="Last name"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>D.O.B</Form.Label>
                <Form.Control
                  type="date"
                  className=""
                  aria-label="date of birth"
                  {...register("date_of_birth", {
                    required: "Date of birth is required",
                  })}
                />
                {/* {errors.date_of_birth && ( */}
                {/* // <p className="text-danger">{errors.date_of_birth.message}</p> */}
                {/* )} */}
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Registration Number/ID</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your Registration ID"
                  aria-label="Registration ID"
                  {...register("registration_id", {
                    required: "Registration ID is required",
                  })}
                />
              </Col>
              <Col xl={6} className="mb-3">
                <Form.Label>Gender</Form.Label>
                <div className="d-flex gap-5">
                  <Form.Check
                    type="radio"
                    label="Male"
                    className="radio"
                    value="male"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    className="radio"
                    value="female"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                </div>
              </Col>
              <Col xl={6} className="mb-3">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  className=""
                  placeholder="Enter your Email ID"
                  aria-label="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {/* {errors.email && ( */}
                {/* // <p className="text-danger">{errors.email.message}</p> */}
                {/* )} */}
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  className=""
                  placeholder="Enter your Contact number"
                  aria-label="Phone number"
                  {...register("landline_number", {
                    required: "Contact number is required",
                  })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Mobile number"
                  aria-label="Phone number"
                  maxLength={10}
                  {...register("mobile_number", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobile number must be exactly 10 digits",
                    },
                  })}
                />
              </Col>
              <Col xl={12} className="mb-3">
                <Form.Label>Site Name</Form.Label>
                <Form.Control
                  type="text"
                  className=""
                  placeholder="Enter your Site name"
                  aria-label="Site name"
                  {...register("site", {
                    required: "Site name is required",
                  })}
                />
              </Col>
              <Col md={6}>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your User name"
                  aria-label="User name"
                  {...register("user_name", {
                    required: "User name is required",
                  })}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type={showpass ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your Password"
                    aria-label="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                 
                </InputGroup>
              </Col>
              <Col md={6}>
                <Form.Label>qualification</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your qualification"
                  aria-label="qualification"
                  {...register("qualification", {
                    required: "qualification is required",
                  })}
                />
              </Col>
              <Col md={6}>
                <Form.Label>specialization</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Enter your specialization"
                  aria-label="specialization"
                  {...register("specialization", {
                    required: "specialization is required",
                  })}
                />
              </Col>
            </Row>
            <p style={{ fontWeight: "700" }}>Professional Details</p>
            <Row className="fw-bold text-muted">
              <Col md={3}>Name of Hospital</Col>
              <Col md={3}>Title / Position</Col>
              <Col md={2}>Location</Col>
              <Col md={2}>From</Col>
              <Col md={2}>To</Col>

              <Col md={3}>
                <Form.Control
                  type="text"
                  {...register("professional_details.company", {
                    required: "Hospital name is required",
                  })}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="text"
                  {...register("professional_details.position", {
                    required: "Position is required",
                  })}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  {...register("professional_details.location", {
                    required: "Location is required",
                  })}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  {...register("professional_details.start_date", {
                    required: "Start date is required",
                  })}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  type="text"
                  {...register("professional_details.end_date", {
                    required: "End date is required",
                  })}
                />
              </Col>

            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Col md={12} className="d-flex justify-content-end mt-3">
              <button
                className="border-0 bg-bluee rounded-2 px-2 py-1 fw-semibold fs-6 text-fixed-white"
                disabled={loader}
              >
                {loader ? (
                  <button
                    className="border-0 blue-bg text-fixed-white rounded-1 ms-2 px-4 fw-bold fs-6"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm mx-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    SUBMIT...
                  </button>
                ) : (
                  <button className="border-0 bg-bluee rounded-2 px-2 py-1 fw-bold fs-6 text-fixed-white">
                    Submit
                  </button>
                )}
              </button>
            </Col>
          </Modal.Footer>
        </form>
      </Modal>
      {/* search api  ? */}

      <Card>
        <div className="card-responsive">
          <CardBody className="">
            <Table className="table text-nowrap border-success ">

              <thead>
                <tr>
                  <td scope="col" className="fw-bold">
                    S.NO
                  </td>
                  <td scope="col" className="fw-bold">
                    Name
                  </td>
                  <td scope="col" className="fw-bold">
                    Add Date
                  </td>
                  <td scope="col" className="fw-bold">
                    Phone
                  </td>
                  <td scope="col" className="fw-bold">
                    Action
                  </td>
                </tr>
              </thead>

              <tbody className="">
                {SearchData ? (
                  SearchData.map((item: any, index: number) => (
                    <tr key={index} className="">
                      <td scope="row">  {(page - 1) * limit + index + 1}.</td>
                      <td>{item?.first_name}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {item?.date_of_doctor_added}
                        </div>
                      </td>
                      <td>
                        <span className="">{item?.mobile_number}</span>
                      </td>
                      <td className="d-flex gap-3">
                      <span onClick={() => {
                     setShowConfirm(true)
                     setSuspendedId(item)


                        }}>

                          {
                            item?.resume_suspended_status === "active" ? (
                              <i className="bi bi-play-circle fs-3"></i>
                            ) : (
                              <i className="bi bi-pause-circle fs-3"></i>
                            )
                          }
                        </span>
                        <span
                          className=""
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
                ) : data ? (
                  kiosksList?.map((idx: any, index: any) => (
                    <tr key={index} className="">
                      <td>  {(page - 1) * limit + index + 1}.</td>
                      <td scope="row">{idx.first_name}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {idx?.date_of_doctor_added}
                        </div>
                      </td>
                      <td>
                        <span className="">{idx?.mobile_number}</span>
                      </td>
                      <td className="d-flex gap-3">
                        <span onClick={() => {
                            setShowConfirm(true)
                            setSuspendedId(idx)


                        }}>

                          {
                            idx?.resume_suspended_status === "active" ? (
                              <i className="bi bi-play-circle fs-3"></i>
                            ) : (
                              <i className="bi bi-pause-circle fs-3"></i>
                            )
                          }
                        </span>
                        <span
                          className=""
                          onClick={() => {
                            setModalShow(true);
                            setSelectedId(idx._id);
                          }}
                        >
                          <i className="bi bi-pencil-square fs-4"></i>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>no data</p>
                )}
              </tbody>
            </Table>
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
        </div>

       
      </Card>
    </Fragment>
  );
};

export default Doctor;
