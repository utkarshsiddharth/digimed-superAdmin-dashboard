import { useState } from "react";
import { Col } from "react-bootstrap";

const Pdf = () => {
  const [qualificationCount, setQualificationCount] = useState(1);
  const [speciality, setSpeciality] = useState(1);
  const [Languages, setLanguages] = useState(1);

  const addQualification = () => {
    setQualificationCount(qualificationCount + 1);
  };
  const addspeciality = () => {
    setSpeciality(speciality + 1);
  };
  const addLanguages = () => {
    setLanguages(Languages + 1);
  };
  return (
    <>
      <div>
        <div className=" d-flex gap-4 px-5">
          <Col xl={7}>
            <div className=" d-flex gap-4 px-2">
              <h6 style={{ color: "black", fontWeight: "bold" }}>
                Qualification
              </h6>
              {Array.from({ length: qualificationCount }).map((_, index) => (
                <Col xl={4} key={index}>
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </Col>
              ))}
              <div>
                <i
                  className="bi bi-plus-square-fill h2"
                  onClick={addQualification}
                ></i>
              </div>
            </div>
          </Col>
        </div>

        <hr
          style={{ borderBottom: "2px solid black", margin: "0", padding: "0" }}
        />
        <div className=" d-flex gap-4 mt-3 px-5">
          <Col xl={7}>
            <div className=" d-flex gap-4  px-2">
              <h6 style={{ color: "black", fontWeight: "bold" }}>Speciality</h6>
              {Array.from({ length: speciality }).map((_, index) => (
                <Col xl={4} key={index}>
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </Col>
              ))}
              <div>
                <i
                  className="bi bi-plus-square-fill h2"
                  onClick={addspeciality}
                ></i>
              </div>
            </div>
          </Col>
        </div>
        <hr
          style={{ borderBottom: "2px solid black", margin: "0", padding: "0" }}
        />
        <div className=" d-flex gap-4 mt-3 px-5">
          <Col xl={7}>
            <div className=" d-flex gap-4 px-2">
              <h6 style={{ color: "black", fontWeight: "bold" }}>
                Languages Known
              </h6>
              {Array.from({ length: Languages }).map((_, index) => (
                <Col xl={4} key={index}>
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label=".form-select-lg example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </Col>
              ))}
              <div>
                <i
                  className="bi bi-plus-square-fill h2"
                  onClick={addLanguages}
                ></i>
              </div>
            </div>
          </Col>
        </div>
        <hr
          style={{ borderBottom: "2px solid black", margin: "0", padding: "0" }}
        />
      </div>
    </>
  );
};

export default Pdf;
