import { Fragment } from "react";
import { Row } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Fragment>
      <Row className="d-flex justify-content-center mt-5">
        <ul className="admin_dashaboad_navBar">
          <li>Months</li>
          <li>week </li>
          <li>day</li>
        </ul>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
