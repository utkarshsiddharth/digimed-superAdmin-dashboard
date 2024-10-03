/* eslint-disable linebreak-style */
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { Form, Button, Col, ToastContainer, Toast } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Fragment, useEffect, useState } from "react";
import logo6 from "../assets/images/faces/logo6.png";
import "react-toastify/dist/ReactToastify.css";
import { useLoginUserMutation } from "../redux/api/auth";
import login from "../assets/images/faces/login.png";

export default function DoctorLogin() {
  const [loginUser] = useLoginUserMutation();

  const [loader, setLoader] = useState(false);
  // const [adminLogin] = useAdminLoginMutation();
  const [show15, setShow15] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    setLoader(true);

    try {
      const response: any = await loginUser(data);
      console.log(response?.error?.data?.message);
      console.log(response);
      if (response?.data?.success) {
        setLoader(false);

        navigate("superAdmin/user");

        const token = response?.data?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
        }
      } else {
        // alert(response?.error?.data?.message);

        setShow15(true);
        setLoader(false);
        // toast.error(response?.error?.data?.message);
      }
    } catch (err) {
      setShow15(true);
      setLoader(false);
      // alert(error?.data?.messsage);
      // console.log("err", err);
    } finally {
      setLoader(false);
    }
  };

  const [passwordshow2, setpasswordshow2] = useState(false);
  useEffect(() => {
    const rootDiv = document.getElementById("root");
    if (rootDiv) {
    }
    return () => {
      if (rootDiv) {
        rootDiv.className = "";
      }
    };
  }, []);
  return (
    <>
      <Fragment>
        <Helmet>
          <body className="bg-white"></body>
        </Helmet>
        <div className="row authentication ms-5">
          <Col xxl={4} xl={4} lg={4} md={12} sm={12}>
            <div className="row justify-content-center h-100">
              <form onSubmit={handleSubmit(onSubmit)}>
                ' ;''
                <div className="">
                  <div className="p-3">
                    <div className="d-flex justify-content-center">
                      <img
                        src={logo6}
                        alt=""
                        className="authentication-brand desktop-logo"
                        style={{ height: "400px", width: "500px" }}
                      />
                      <img
                        src={logo6}
                        alt=""
                        className="authentication-brand desktop-dark"
                        style={{ height: "400px", width: "500px" }}
                      />
                    </div>
                    <div className="d-flex justify-content-center ">
                      <h1 className="fs-5 fw-bold blue-texxt">
                        SUPERADMIN LOGIN
                      </h1>
                    </div>
                    <Col xl={12} className="mt-0">
                      <label
                        htmlFor="create-password"
                        className="form-label text-default"
                      >
                        Username
                      </label>
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          className="form-control-lg"
                          id="create-password"
                          placeholder="Enter Username"
                          {...register("email_id", { required: true })}
                        />
                      </div>
                      {errors.email_id?.type === "required" && (
                        <p className="text-danger">Username is Required</p>
                      )}
                      <Form.Label
                        htmlFor="create-confirmpassword"
                        className="form-label text-default mt-3"
                      >
                        Password
                      </Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={passwordshow2 ? "text" : "password"}
                          className="form-control-lg"
                          id="create-confirmpassword"
                          placeholder="Enter Password"
                          {...register("password", {
                            required: "Email Address is required",
                          })}
                        />
                        <Button
                          variant=""
                          className="btn btn-light"
                          type="button"
                          onClick={() => setpasswordshow2(!passwordshow2)}
                        >
                          <i
                            className={`${
                              passwordshow2 ? "ri-eye-line" : "ri-eye-off-line"
                            } align-middle`}
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-danger">Password is Required</p>
                      )}
                    </Col>
                    <Col xl={12} className=" d-grid mt-3">
                      <button
                        className=" border-0 bg-bluee rounded-2 py-2 fw-semibold fs-6 text-fixed-white button bg-bluee "
                        disabled={loader}
                      >
                        {loader ? (
                          <button
                            className="border-0 bg-bluee text-fixed-white rounded-1 ms-2 px-4 fw-semibold fs-14 "
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-border spinner-border-sm mx-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Login...
                          </button>
                        ) : (
                          <span className="ms-2 fs-15 fw-semibold ">Login</span>
                        )}
                      </button>
                    </Col>
                    <h1 className="d-flex justify-content-end blue-text fs-15 ms-2 fw-semibold mt-2">
                      Forget Password ?
                    </h1>
                  </div>
                </div>
              </form>
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} className="d-lg-block d-none px-2">
            <div className="row justify-content-center align-items-center h-100 me-5">
              <div className="">
                <img src={login} className="h-100 w-100"></img>
              </div>
            </div>
          </Col>
        </div>
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
                style={{ backgroundColor: "#DD0F3F" }}
              >
                <strong className="me-auto">Kiosk Dashboard</strong>
              </Toast.Header>
              <Toast.Body className="toast-body bg-danger-transparent">
                Invalid Credentials
              </Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </Fragment>
    </>
  );
}
