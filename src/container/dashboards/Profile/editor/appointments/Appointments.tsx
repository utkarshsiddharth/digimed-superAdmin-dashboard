import { FC, Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Editor from "../Editor";
// import Pageheader from "../../../../components/pageheader/pageheader";
// import Editor from '../editordata';
// import Editor1 from './quillbubbleeditor';

interface AppointmentsProps {}

const Appointments: FC<AppointmentsProps> = () => {
  return (
    <Fragment>
      <Row>
        <Col xl={12}>
          <Card className="card custom-card">
            <Card.Header>
              <Card.Title>Appointment</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-wrap">
                <Col xl={6}>
                  <div className="form-check form-switch d-flex justify-content-strat align-items-center flex-wrap gap-5">
                    <h5>Appointment Reminder</h5>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      style={{ width: "70px", height: "30px" }}
                    />
                  </div>
                  <div className="d-flex gap-5 p-3 flex-wrap">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">Mail</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">SMS</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">Both</label>
                    </div>
                  </div>
                  <h6 className="px-3">New Appointment</h6>
                  <div className="d-flex gap-5 p-3 flex-wrap">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadioss"
                        id="exampleRadios2"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">Mail</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadioss"
                        id="exampleRadios2"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">SMS</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadioss"
                        id="exampleRadios2"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">Both</label>
                    </div>
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="form-check form-switch d-flex justify-content-strat align-items-center gap-5">
                    <h5>Daily Reminder</h5>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      style={{ width: "70px", height: "30px" }}
                    />
                  </div>
                  <div className="d-flex gap-5 p-3 flex-wrap">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadiosa"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">Mail</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadiosa"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">SMS</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="exampleRadiosa"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label className="form-check-label">Both</label>
                    </div>
                  </div>
                </Col>
              </div>
              <Editor />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Appointments;
