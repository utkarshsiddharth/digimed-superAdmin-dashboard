import { Fragment, useState } from "react";
import { Row, Col, NavItem, Card, Form } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";

const AdminSetSchedule = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);

  const handleNavItemClick = (index: any) => {
    setActiveNavItem(index);
  };
  return (
    <Fragment>
      <Card className="mt-5">
        <Row className="px-4 py-3">
          <Col xl={6} className="text-center">
            {" "}
            <NavItem
              className={`admin_User_NavItem bg-light rounded fs-15 fw-bold  ${
                activeNavItem === 0 ? "activeAdminUserNav" : ""
              }`}
              onClick={() => handleNavItemClick(0)}
            >
              Doctor
            </NavItem>
          </Col>
          <Col xl={6}>
            <NavItem
              className={`admin_User_NavItem bg-light rounded text-center fs-15 fw-bold  ${
                activeNavItem === 1 ? "activeAdminUserNav" : ""
              }`}
              onClick={() => handleNavItemClick(1)}
            >
              Kiosk
            </NavItem>
          </Col>
        </Row>
      </Card>
      <Card>
        <Row className="px-4 py-3">
          <Col xl={4}>
            {activeNavItem === 0 ? (
              <h5 className="fw-bold AdminSetScheduleNav_second fs-15 ">
                Select Doctors
              </h5>
            ) : (
              ""
            )}
            {activeNavItem == 1 ? (
              <div>
                <h5 className="fw-bold AdminSetScheduleNav_second fs-15">
                  Select Kiosk
                </h5>
              </div>
            ) : (
              ""
            )}
          </Col>
          <Col xl={4}>
            {" "}
            <h5 className="fw-bold AdminSetScheduleNav_second fs-15">
              {" "}
              Available Doctors
            </h5>
          </Col>
          <Col xl={4}>
            <h5 className="fw-bold AdminSetScheduleNav_second fs-15">
              {" "}
              Selected Doctors{" "}
            </h5>
          </Col>

          <Col xl={4}>
            {activeNavItem === 0 ? (
              <p className="fs-15">
                Select A Doctor And Click The Arrow
                <br /> Button To Add And Remove Doctors
              </p>
            ) : (
              ""
            )}
            {activeNavItem === 1 ? (
              <p className="fs-15">
                {" "}
                Select a Kiosk And Click The Arrow
                <br /> Button To Add And Removed Kiosk
              </p>
            ) : (
              ""
            )}
          </Col>

          <Col xl={4}>
            <div className="adminSetSchedula_available border rounded">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Available Doctor"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <IoSearchOutline />
                </span>
              </div>
              <div className="mx-4">
                <div className="adminSetSchedula_available_doctorListe"></div>
                <div className="adminSetSchedula_available_doctorListe"></div>
                <div className="adminSetSchedula_available_doctorListe"></div>
                <div className="adminSetSchedula_available_doctorListe"></div>
              </div>
            </div>
          </Col>
          <Col xl={4}>
            {" "}
            <div className="adminSetSchedula_available border rounded">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Selected Doctor"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  <IoSearchOutline />
                </span>
              </div>
              <div className="mx-4">
                <div className="adminSetSchedula_available_doctorListe"></div>
                <div className="adminSetSchedula_available_doctorListe"></div>
                <div className="adminSetSchedula_available_doctorListe"></div>
                <div className="adminSetSchedula_available_doctorListe"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
      <Card className="p-4 ">
        <Row>
          <Col xl={5} className="fw-bold fs-15">
            Set Time Available
          </Col>
          <Col xl={7}>
            <Row>
              <Col xl={4} className="fw-bold fs-15">
                Duration
              </Col>
              <Col xl={4} className="fw-bold fs-15">
                Start
              </Col>
              <Col xl={4} className="fw-bold fs-15">
                End
              </Col>
              <Col xl={4}>
                <Form.Control type="text" />
              </Col>
              <Col xl={4}>
                <Form.Control type="text" />
              </Col>
              <Col xl={4}>
                <Form.Control type="text" />
              </Col>
            </Row>
          </Col>
          <Col xl={5} className="fw-bold fs-15">
            Recurrence
          </Col>
          <Col xl={7} className="py-4">
            <Col xl={4} className="d-flex gap-5">
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  id="customRadioInline1"
                  name="customRadioInline1"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline1"
                >
                  Daily
                </label>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  id="customRadioInline2"
                  name="customRadioInline1"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline2"
                >
                  Every
                </label>
              </div>
              <Col xl={4}>
                <div className="d-flex gap-2 align-items-center">
                  <Form.Control type="text" />
                  <Form.Label>Daily</Form.Label>
                </div>
              </Col>
            </Col>
            <Col xl={4} className="d-flex gap-5 py-3">
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  id="customRadioInline1"
                  name="customRadioInline2"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline1"
                >
                  Weekly
                </label>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  id="customRadioInline2"
                  name="customRadioInline2"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline2"
                >
                  Every week day
                </label>
              </div>
            </Col>
          </Col>
          <Col xl={5} className="fw-bold fs-15">
            Rang
          </Col>
          <Col xl={7} className="py-3">
            <Col xl={2} className="py-3">
              <Form.Control type="text" />
            </Col>
            <Col xl={4} className="d-flex gap-3">
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  id="customRadioInline2"
                  name="customRadioInline3"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline2"
                >
                  End After
                </label>
              </div>
              <Col xl={4}>
                <div className="d-flex gap-3 align-items-center">
                  <Form.Control type="text" />
                  <Form.Label>Daily</Form.Label>
                </div>
              </Col>
            </Col>
            <Col xl={4} className="d-flex gap-4 py-3">
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  id="customRadioInline2"
                  name="customRadioInline3"
                  className="custom-control-input"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadioInline2"
                >
                  End By
                </label>
              </div>
              <Col xl={4}>
                <div className="d-flex gap-2 align-items-center">
                  <Form.Control type="text" />
                </div>
              </Col>
            </Col>
          </Col>
        </Row>
        <Row>
          <button className=" border-0 bg-bluee rounded-2 py-2 fw-semibold fs-6 text-fixed-white button my-3">
            <span className="ms-2 fs-15 fw-semibold">Save</span>
          </button>

          <button className=" border-0 bg-bluee rounded-2 py-2 fw-semibold fs-6 text-fixed-white button">
            <span className="ms-2 fs-15 fw-semibold">Remove Availability</span>
          </button>
        </Row>
      </Card>
    </Fragment>
  );
};

export default AdminSetSchedule;
