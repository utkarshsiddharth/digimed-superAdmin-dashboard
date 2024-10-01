/* eslint-disable linebreak-style */
import { Card, Col, Row } from "react-bootstrap";
export const Reports = () => {
  return (
    <>
      <div className="mt-5 px-2">
        <h5 className="px-2" style={{ fontWeight: "bold" }}>
          Reports
        </h5>
      </div>
      <div
        className="d-flex flex-wrap justify-content-between align-items-center text-center  px-5 py-2 "
        style={{ backgroundColor: "white", borderRadius: "10px" }}
      >
        <div className=" d-flex gap-2">
          <h6 className="pt-2" style={{ width: "200px" }}>
            <b>Select a Site </b>
          </h6>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{
              borderColor: "#AF94EA",
              backgroundColor: "#ebdefc",
              height: "40px",
            }}
          >
            <option selected>Select...</option>
            <option value="1">Site 1</option>
            <option value="2">Site 2</option>
            <option value="3">Site 3</option>
          </select>
        </div>
        <div className=" d-flex gap-2">
          <h6 className="pt-2" style={{ width: "240px" }}>
            <b>Select a Doctor </b>
          </h6>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{
              borderColor: "#AF94EA",
              backgroundColor: "#ebdefc",
              height: "40px",
            }}
          >
            <option selected>Select...</option>
            <option value="1">Doctor 1</option>
            <option value="2">Doctor 2</option>
            <option value="3">Doctor 3</option>
          </select>
        </div>
        <div className=" d-flex gap-2">
          <h6 className="pt-2" style={{ width: "240px" }}>
            <b>Select a Loction</b>
          </h6>
          <select
            className="form-select"
            aria-label="Default select example"
            style={{
              borderColor: "#AF94EA",
              backgroundColor: "#ebdefc",
              height: "40px",
            }}
          >
            <option selected>Select...</option>
            <option value="1">Loction 1</option>
            <option value="2">Loction 2</option>
            <option value="3">Loction 3</option>
          </select>
        </div>
      </div>
      <Row>
        <Col xxl={12} xl={8} className="mt-5">
          <Card className="custom-card upload-nft">
            <Card.Header className="d-flex justify-content-between">
              <Card.Title>Consult</Card.Title>
              <div className="d-flex gap-5 pt-4">
                <Card
                  className="py-2 px-4"
                  style={{
                    backgroundColor: "#845ADF",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Daily
                </Card>
                <Card className="py-2 px-4">Weekly</Card>
                <Card className="py-2 px-4">Monthly</Card>
                <Card className="py-2 px-4">Yearly</Card>
              </div>
            </Card.Header>
          </Card>
        </Col>
      </Row>
    </>
  );
};
