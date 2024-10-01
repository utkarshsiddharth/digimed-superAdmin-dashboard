import { FC, Fragment } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import Pageheader from "../../../../components/pageheader/pageheader";
// import face1 from "../../../../assets/images/faces/1.jpg";
// import image18 from "../../../../assets/images/nft-images/18.png";
// import crypto from "../../../../assets/images/crypto-currencies/square-color/Ethereum.svg";
// import { FilePond, registerPlugin } from "react-filepond";
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import Editor from "./editor/Editor";
import Pdf from "./editor/Pdf";
import Appointments from "./editor/appointments/Appointments";
// import { useUpdatedoctorProfileMutation } from "../../server/PostApi";

// registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

interface CreatenftProps {}

const Createnft: FC<CreatenftProps> = () => {
  // const res = useUpdatedoctorProfileMutation();
  // console.log(res);
  // const Data1 = [
  //   { value: "Choose Royalities", label: "Choose Royalities" },
  //   { value: "Flat Royalty", label: "Flat Royalty" },
  //   { value: "Graduated Royalty", label: "Graduated Royalty" },
  //   { value: "Tiered Royalty", label: "Tiered Royalty" },
  //   { value: "Time-Limited Royalty", label: "Time-Limited Royalty" },
  //   { value: "Customized Royalty", label: "Customized Royalty" },
  // ];
  return (
    <Fragment>
      {/* <Pageheader title="Create NFT" heading="NFT" active="Create NFT" /> */}
      <Row>
        <Col xxl={12} xl={8} className="mt-5">
          <Card className="custom-card upload-nft">
            <Card.Header>
              <Card.Title>Profile</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row gy-3 justify-content-between">
                <Col xxl={3} xl={12}>
                  <div className="create-nft-item d-flx justify-content-center algin-item-center mx-5">
                    {/* <Form.Label className="form-label">Upload NFT</Form.Label> */}
                    <img
                      src="https://cdn.gencraft.com/prod/user/8c01da31-57fb-495e-b0a9-0fec53a1022f/7e272f95-be98-4cac-8b11-76d24ca717d2/image/image1_0.jpg?Expires=1720172000&Signature=reeikMBDcDLYIJf27rA7g5dhMknPowwv23n4ORMnwV1q5Ms~Nkhf2Lr3o1dTy4l5r-chaDp6lrBe8bnDl-qwZ2q7GRqy~dEEDcCz-OQ0-DaBC4nr~hWf7DCq71AwV7eeqfFF6AqfgafHpUFmNoM5A7RnHhr3R0zDi1OeDwy1l33yHu8CVtXwydb5pf3tPbcHIq1kBTnpFBEjEiYgDFZp-bsVaoGBJMJQSqOp9yxEHPns4mND7qM4atFD2TI4Fby6znSxDR46TcYzVoJJAPTB9NK6EBm4xA1yIlGw4R42OIXxWe5e~l~QY6zL~3FV~TOFspxRWOi4qKgWr8PNhXqJzA__&Key-Pair-Id=K3RDDB1TZ8BHT8"
                      style={{
                        borderRadius: "50%",
                        height: "250px",
                        width: "250px",
                      }}
                      alt=""
                    />
                  </div>
                </Col>
                <Col xxl={8} xl={12}>
                  <div className="row gy-3">
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="input-placeholder"
                        placeholder="firstName"
                      />
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="input-placeholder"
                        placeholder="lastName"
                      />
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        D.O.B
                      </Form.Label>
                      <Form.Control
                        type="date"
                        id="input-placeholder"
                        placeholder="date of birth"
                      />
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        Contect Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="input-placeholder"
                        placeholder="contect Number"
                      />
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        id="input-placeholder"
                        placeholder="email id"
                      />
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        Maritial Status
                      </Form.Label>
                      <div className="d-flex gap-5">
                        <div className="form-check mb-2">
                          <label
                            className="form-check-label"
                            htmlFor="primaryChecked"
                          >
                            Married
                          </label>
                          <input
                            type="radio"
                            className="form-check-input form-checked"
                            id="primaryChecked"
                            defaultChecked
                          />
                        </div>
                        <div className="form-check mb-2">
                          <label
                            className="form-check-label"
                            htmlFor="primaryChecked"
                          >
                            Single
                          </label>
                          <input
                            type="radio"
                            value=""
                            className="form-check-input form-checked-info"
                            id="primaryChecked"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        Reminder/ID
                      </Form.Label>
                      <Form.Control
                        type="date"
                        id="input-placeholder"
                        placeholder="eg:Neo-Nebulae"
                      />
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        Vaild Till
                      </Form.Label>
                      <Form.Control
                        type="date"
                        id="input-placeholder"
                        placeholder="eg:Neo-Nebulae"
                      />
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        Work Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="input-placeholder"
                        placeholder="word Number"
                      />
                    </Col>
                    <Col xl={6}>
                      <Form.Label
                        htmlFor="input-placeholder"
                        className="form-label"
                      >
                        Mobile Number
                      </Form.Label>
                      <Form.Control
                        type="text"
                        id="input-placeholder"
                        placeholder="mobile Number"
                      />
                    </Col>
                  </div>
                </Col>
              </div>
              <Card.Header>
                <Card.Title>Biography-About</Card.Title>
              </Card.Header>
              <Editor />
              <hr />
              <Col xl={12}>
                <Pdf />
              </Col>
              <hr />
              <Col xl={12}>
                <Appointments />
              </Col>
            </Card.Body>

            <Card.Footer className="text-end">
              <Link
                to="#"
                className="btn btn-primary btn-wave waves-effect waves-light"
              >
                Create
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Createnft;
