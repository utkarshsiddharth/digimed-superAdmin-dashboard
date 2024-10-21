/* eslint-disable linebreak-style */
import { Fragment, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Nav,
  Modal,

  InputGroup,
} from "react-bootstrap";
import Doctor from "./Doctor/Doctor";
import Koisk from "./koisk/Koisk";
import Organization from "./Organization/Organization";
import { useForm } from "react-hook-form";
import {
  useAddDoctorMutation,
  useAddKoiskMutation,
  useAddOrganizationMutation,
} from "../../../redux/api/auth";
import {
  useKoiskloctionlistQuery,
  useSearchItemQuery,
} from "../../../redux/api/superAdmin";

const Users = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const { data: kioskLoction } = useKoiskloctionlistQuery("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedLocation(selectedValue);
  };
  const dataSearch =
    activeNavItem === 0 ? "doctor" : activeNavItem === 1 ? "kiosk" : undefined;
  const [showpass] = useState(false);
  const [, setSreachModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { data } = useSearchItemQuery({
    inputValue,
    dataSearch,
    selectedLocation,
  });
  const handleShow = () => setSreachModal(true);
  console.log("data", handleShow);
  const handleClose = () => setSreachModal(false);
  console.log("data", handleClose);
  const handleSreachEvent = (e: any) => {
    setInputValue(e.target.value);
    setSreachModal(true);
  };
  const [, setShow15] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleNavItemClick = async (index: any) => {
    setActiveNavItem(index);
  };
  const [addDoctor] = useAddDoctorMutation();
  const [addkiosk] = useAddKoiskMutation();  
  const [addOrganization] = useAddOrganizationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const formattedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      registration_id: data.registration_id,
      gender: data.gender,
      email: data.email,
      landline_number: data.landline_number,
      mobile_number: data.mobile_number,
      site: data.site,
      user_name: data.user_name,
      password: data.password,
      biography: data.biography,
      professional_details: [
        {
          company: data.company,
          position: data.position,
          start_date: data.start_date,
          end_date: data.end_date,
        },
      ],
      qualification: data.qualification,
      specialization: data.specialization,
    };
    console.log("Formatted Data:", formattedData);
    setLoader(true);
    try {
      const response = await addDoctor(formattedData);
      console.log(response);
      //@ts-ignore
      if (response?.error?.data?.message) {
        //@ts-ignore
        console.error("Error:", response?.error.data.message);
        //@ts-ignore
        alert("Error: " + response?.error.data.message);
        setLoader(false);
        return;
      }
      alert("Doctor added successfully");
      setShow15(true);
      setModalShow(false);
    } catch (err) {
      console.error("Error during submission:", err);
      alert("An error occurred while adding the doctor. Please try again.");
    } finally {
      setLoader(false);
    }
  };
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: formErrors },
  } = useForm();

  const onSubmit1 = async (data: any) => {
    setLoader(true);
    try {
      const response: any = await addkiosk(data);
      console.log("Response from addkiosk:", response);
      if (response?.data) {
        alert(response?.data.message);
      }
      if (response?.error?.data?.message) {
        //@ts-ignore
        console.error("Error:", response?.error.data.message);
        //@ts-ignore
        alert("Error: " + response?.error.data.message);
      }

      setShow15(true);
      setModalShow(false);
    } catch (err) {
      //  alert("somthing went wrong..")
      console.error("Error:", err);
    } finally {
      setLoader(false);
    }
  };
  // for organization 
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const onSubmit2 = async (data: any) => {
    setLoader(true);
    try {
      const response: any = await addOrganization(data);
     
      if (response?.data) {
        alert(response?.data.message);
      }
      if (response?.error?.data?.message) {
        //@ts-ignore
        console.error("Error:", response?.error.data.message);
        //@ts-ignore
        alert("Error: " + response?.error.data.message);
      }

      setShow15(true);
      setModalShow(false);
    } catch (err) {
      //  alert("somthing went wrong..")
      console.error("Error:", err);
    } finally {
      setLoader(false);
    }
  };
  return (
    <Fragment>
      {/* add koisk Modal */}
      {activeNavItem === 0 && (
        <div>
          <Modal
            backdrop="static"
            animation={false}
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
            keyboard={false}
            className="modal fade px-2"
            size="xl"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title as="h6">Add Doctor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6} className="">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your First name"
                      aria-label="First name"
                      {...register("first_name", {
                        required: "First name is Required",
                      })}
                    />
                    {errors?.first_name && (
                      <p className="text-danger">First Name is Required</p>
                    )}
                    {formErrors?.first_name && (
                      <p className="text-white">First Name is Required</p>
                    )}
                  </Col>
                  <Col md={6} className="">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your Last name"
                      aria-label="Last name"
                      {...register("last_name", {
                        required: "Last name is Required",
                      })}
                    />
                    {errors?.last_name && (
                      <p className="text-danger">Please Enter Last Name</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label>D.O.B</Form.Label>
                    <Form.Control
                      type="date"
                      className=""
                      aria-label="date of birth"
                      {...register("date_of_birth", {
                        required: "Date of birth is Required",
                      })}
                    />

                    <span className="text-danger">
                      {errors?.date_of_birth && (
                        <p>Date of Birth is Required</p>
                      )}
                    </span>
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label>Registration Number/ID</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your Registration ID"
                      aria-label="Registration ID"
                      {...register("registration_id", {
                        required: "Registration ID is Required",
                      })}
                    />
                    <p className="text-danger">
                      {errors.registration_id && (
                        <span>Registration ID is Required</span>
                      )}
                    </p>
                  </Col>
                  <Col xl={6} className="mt-2">
                    <Form.Label>Gender</Form.Label>
                    <div className="d-flex gap-5">
                      <Form.Check
                        type="radio"
                        label="Male"
                        className="radio"
                        value="male"
                        {...register("gender", {
                          required: "Gender is Required",
                        })}
                      />
                      <Form.Check
                        type="radio"
                        label="Female"
                        className="radio"
                        value="female"
                        {...register("gender", {
                          required: "Gender is Required",
                        })}
                      />
                    </div>
                    {errors.gender && (
                      <p className="text-danger">Gender is Required</p>
                    )}
                  </Col>
                  <Col xl={6} className="mt-2">
                    <Form.Label>Email ID</Form.Label>
                    <Form.Control
                      type="email"
                      className=""
                      placeholder="Enter your Email ID"
                      aria-label="Email"
                      {...register("email", {
                        required: "Email is Required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-danger">Email ID is Required</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      placeholder="Enter your Contact Number"
                      aria-label="Phone number"
                      {...register("landline_number", {
                        required: "Contact number is Required",
                      })}
                    />
                    {errors.contact_number && (
                      <span className="text-danger">
                        Contact Number is Required
                      </span>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Mobile Number"
                      aria-label="Phone number"
                      maxLength={10}
                      {...register("mobile_number", {
                        required: "Mobile number is Required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Mobile number must be exactly 10 digits",
                        },
                      })}
                    />
                    <p className="text-danger">
                      {errors?.mobile_number && (
                        <span>Mobile Number is Required</span>
                      )}
                    </p>
                  </Col>
                  <Col xl={12} className="">
                    <Form.Label>Site Name</Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      placeholder="Enter your Site Name"
                      aria-label="Site name"
                      {...register("site", {
                        required: "Site name is Required",
                      })}
                    />
                    {errors.site && (
                      <p className="text-danger">Site Name is Required</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your User Name"
                      aria-label="User name"
                      {...register("user_name", {
                        required: "User name is required",
                      })}
                    />
                    {errors?.user_name && (
                      <p className="text-danger">User Name is Required</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="">
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
                    {errors.password && (
                      <p className="text-danger">Password is Required</p>
                    )}
                  </Col>
                  <Col xl={6} className="mt-2">
                    <Form.Label>qualification</Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      placeholder="Enter your Site Name"
                      aria-label="Site name"
                      {...register("qualification", {
                        required: "Site name is Required",
                      })}
                    />
                    {errors.site && (
                      <p className="text-danger">
                        qualification Name is Required
                      </p>
                    )}
                  </Col>
                  <Col xl={6} className="mt-2">
                    <Form.Label>specialization</Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      placeholder="Enter your Site Name"
                      aria-label="Site name"
                      {...register("specialization", {
                        required: "Site name is Required",
                      })}
                    />
                    {errors.site && (
                      <p className="text-danger">
                        specialization Name is Required
                      </p>
                    )}
                  </Col>
                </Row>
                <p className="fw-bold fs-6">Professional Details</p>
                <div className="row gy-3">
                  <Col xl={2}>
                    <Form.Label className="text-muted">
                      Name of Hospital
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      {...register("company", {
                        required: "Hospital name is Required",
                      })}
                    />
                    {errors.company && (
                      <p className="text-danger ">Company Name is Required</p>
                    )}
                  </Col>
                  <Col xl={2}>
                    <Form.Label className="text-muted">
                      Title / Position
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      {...register("position", {
                        required: "Position is Required",
                      })}
                    />
                    {errors.company && (
                      <p className="text-danger">Position Name is Required</p>
                    )}
                  </Col>
                  <Col xl={2}>
                    <Form.Label className="text-muted">Location</Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      {...register("location", {
                        required: "Location Name is Required",
                      })}
                    />
                    {errors.company && (
                      <p className="text-danger">Location Name is Required</p>
                    )}
                  </Col>
                  <Col xl={2}>
                    <Form.Label className="text-muted">From</Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      {...register("start_date", {
                        required: "Start date is Required",
                      })}
                    />
                    {errors.company && (
                      <p className="text-danger">Start date is Required</p>
                    )}
                  </Col>
                  <Col xl={2}>
                    <Form.Label className="text-muted">To</Form.Label>
                    <Form.Control
                      type="text"
                      className=""
                      {...register("end_date", {
                        required: "End date is Required",
                      })}
                    />
                    {errors.company && (
                      <p className="text-danger">End date is Required</p>
                    )}
                  </Col>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Col md={12} className="d-flex justify-content-end mt-3">
                  <button
                    className="border-0 bg-bluee rounded-2 py-2 px-4 fw-bold fs-6 text-fixed-white"
                    disabled={loader}
                  >
                    {loader ? (
                      <button
                        className="border-0 blue-bg  rounded-2 py-2 px-4 ms-2 fw-bold fs-6 text-fixed-white "
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
                      <span className="fs-6 fw-semibold">Submit</span>
                    )}
                  </button>
                </Col>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      )}
      {activeNavItem === 1 && (
        <div>
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
            <form onSubmit={handleSubmit1(onSubmit1)}>
              <Modal.Header closeButton>
                <Modal.Title as="h6">Add kiosk</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={12} className="">
                    <Form.Label className="">Center Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your Center Name"
                      aria-label="First name"
                      {...register1("name_of_center", { required: true })}
                    />
                  </Col>
                  {errors?.first_name && (
                    <p className="text-danger">Center Name</p>
                  )}
                  <Col md={6} className="mt-2">
                    <Form.Label className="">Address </Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your Address"
                      aria-label="Last name"
                      {...register1("address", { required: true })}
                    />
                    {errors.first_name && (
                      <p className="text-danger">Please Enter Address_line1</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label className="">District</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your District"
                      aria-label="Last name"
                      {...register1("district", { required: true })}
                    />
                    {errors.first_name && (
                      <p className="text-danger">Please Enter District</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label className="">Country</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your Country"
                      aria-label="Last name"
                      {...register1("country", { required: true })}
                    />
                    {errors.first_name && (
                      <p className="text-danger">Please Enter Country</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label className="">State</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your State"
                      aria-label="Last name"
                      {...register1("state", { required: true })}
                    />
                    {errors.first_name && (
                      <p className="text-danger">Please Enter state</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label className="">City</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your City"
                      aria-label="Last name"
                      {...register1("city", { required: true })}
                    />
                    {errors.first_name && (
                      <p className="text-danger">Please Enter City</p>
                    )}
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label className="">Pin Code</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your Pin Code"
                      aria-label="Last name"
                      {...register1("pincode", { required: true })}
                    />
                  </Col>
                  <Col xl={6} className="mt-2">
                    <Form.Label className="">Email ID</Form.Label>
                    <Form.Control
                      type="email"
                      className=""
                      placeholder="Enter your Email ID"
                      aria-label="email"
                      {...register1("email_id", { required: true })}
                    />
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label className="">Mobile Number</Form.Label>
                    <Form.Control
                      type="number"
                      className=""
                      placeholder="Enter your Mobile Number"
                      aria-label="Phone number"
                      {...register1("phone_number", { required: true })}
                    />
                  </Col>
                  <Col md={6} className="mt-2">
                    <Form.Label className="">User Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your User Name"
                      aria-label="First name"
                      {...register1("username", { required: true })}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="mt-2">Password</Form.Label>
                    <InputGroup className="">
                      <Form.Control
                        type={showpass ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter your Password"
                        aria-label="Last name"
                        {...register1("password", { required: true })}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Modal.Body>

              <Modal.Footer>
                <Col md={12} className="d-flex justify-content-end mt-3">
                  <button
                    className=" border-0 bg-bluee rounded-2 py-2 px-4 fw-semibold fs-6 text-fixed-white"
                    disabled={loader}
                  >
                    {loader ? (
                      <button
                        className="border-0 blue-bg rounded-2 ms-2 px-4 fw-semibold fs-6 text-fixed-white"
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
                      <span className="fs-15 fw-semibold">Submit</span>
                    )}
                  </button>
                </Col>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      )}

      {activeNavItem === 2 && (
        <div>
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
            <form onSubmit={handleSubmit2(onSubmit2)}>
              <Modal.Header closeButton>
                <Modal.Title as="h6">Add Organization</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6} className="">
                    <Form.Label className="">Organization Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your Organization Name"
                      aria-label="First name"
                      {...register2("name", { required: true })}
                    />
                  </Col>
                  <Col xl={6} className="mt-2">
                    <Form.Label className="">Organization Email ID</Form.Label>
                    <Form.Control
                      type="email"
                      className=""
                      placeholder="Enter your Organization Email ID"
                      aria-label="email"
                      {...register2("email", { required: true })}
                    />
                  </Col>

                  <Col md={6} className="mt-2">
                    <Form.Label className="">Address</Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Enter your Address"
                      aria-label="Last name"
                      {...register2("address", { required: true })}
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Label className="mt-2">
                      Organization Password
                    </Form.Label>
                    <InputGroup className="">
                      <Form.Control
                        type={showpass ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter your Password"
                        aria-label="Last name"
                        {...register2("password", { required: true })}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Modal.Body>

              <Modal.Footer>
                <Col md={12} className="d-flex justify-content-end mt-3">
                  <button
                    className=" border-0 bg-bluee rounded-2 py-2 px-4 fw-semibold fs-6 text-fixed-white"
                    disabled={loader}
                  >
                    {loader ? (
                      <button
                        className="border-0 blue-bg rounded-2 ms-2 px-4 fw-semibold fs-6 text-fixed-white"
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
                      <span className="fs-15 fw-semibold">Submit</span>
                    )}
                  </button>
                </Col>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      )}
      <Row className="my-4 mx-1">
        <Card className="p-3">
          <div className="d-flex flex-wrap justify-content-between">
            {activeNavItem === 1 ? (
              <Col xl={3}>
                <div className="d-flex gap-2 align-items-center justify-content-center">
                  <b className="fs-15">Location</b>
                  <Form.Select
                    aria-label="Default select example"
                    className="py-2"
                    value={selectedLocation}
                    onChange={handleSelectChange}
                  >
                    <option className="fs-15" value="">
                      All
                    </option>
                    {kioskLoction?.data?.map((location: any, index: any) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Col>
            ) : (
              <p></p>
            )}
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <div className="chat-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 py-2"
                    placeholder="Search"
                    aria-describedby="button-addon2"
                    value={inputValue}
                    onChange={handleSreachEvent}
                  />
                  <Button
                    variant=""
                    aria-label="button"
                    className="btn btn-light"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="ri-search-line text-muted "></i>
                  </Button>
                </div>
              </div>
              <div>
                <button
                  className="fs-6 fw-semibold rounded-2 border-0 px-3 py-2 bg-bluee text-fixed-white"
                  onClick={() => setModalShow(true)}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </Card>
      </Row>
      {/* =============user navItem ========== */}
      <Row>
        <Card className="py-2">
          <Nav
            className="nav nav-tabs mb-3 nav-justified nav-style-1 d-sm-flex d-block"
            role="tablist"
            defaultActiveKey="first"
          >
            <Nav.Item className="">
              <Nav.Link
                eventKey="first"
                type="button"
                className={`koisk_test_nav fs-15 ${
                  activeNavItem === 0 ? "activeAdminUserNav" : ""
                }`}
                onClick={() => handleNavItemClick(0)}
              >
                Doctor
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="second"
                type="button"
                className={`koisk_test_nav fs-15 ${
                  activeNavItem === 1 ? "activeAdminUserNav" : ""
                }`}
                onClick={() => handleNavItemClick(1)}
              >
                Kiosk
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="">
              <Nav.Link
                eventKey="third"
                type="button"
                className={`koisk_test_nav fs-15 ${
                  activeNavItem === 2 ? "activeAdminUserNav" : ""
                }`}
                onClick={() => handleNavItemClick(2)}
              >
                Organization
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {activeNavItem === 0 && (
            <div>
              <Doctor SearchData={data?.data?.result} />
            </div>
          )}
          {activeNavItem === 1 && (
            <div>
              <Koisk SearchData={data?.data?.result} />
            </div>
          )}
          {activeNavItem === 2 && (
            <div>
              <Organization SearchData ={inputValue} />
            </div>
          )}
        </Card>
      </Row>
      {/* {activeNavItem === 0 && (
        <div>
          {show15 && (
            <ToastContainer className="toast-container position-fixed top-0 end-0 p-3">
              <Toast
                id="topright-Toast"
                className="toast colored-toast text-fixed-white"
                onClose={() => setShow15(false)}
                show={show15}
                delay={2000}
                autohide
              >
                <Toast.Header
                  className="toast-header text-fixed-white "
                  style={{ backgroundColor: "##06A042" }}
                >
                  <strong className="me-auto">Add Doctor</strong>
                </Toast.Header>
                <Toast.Body className="toast-body bg-success-transparent">
                  ADD DOCTOR SUCCESSFULLY
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </div>
      )}
      {activeNavItem === 1 && (
        <div>
          {show15 && (
            <ToastContainer className="toast-container position-fixed top-0 end-0 p-3">
              <Toast
                id="topright-Toast"
                className="toast colored-toast text-fixed-white"
                onClose={() => setShow15(false)}
                show={show15}
                delay={2000}
                autohide
              >
                <Toast.Header
                  className="toast-header text-fixed-white "
                  style={{ backgroundColor: "##06A042" }}
                >
                  <strong className="me-auto">Add Kiosk</strong>
                </Toast.Header>
                <Toast.Body className="toast-body bg-success-transparent">
                  ADD KIOSK SUCCESSFULLY
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </div>
      )} */}
    </Fragment>
  );
};

export default Users;
