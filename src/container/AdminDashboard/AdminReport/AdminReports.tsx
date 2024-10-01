/* eslint-disable linebreak-style */
import { FC, Fragment, useEffect, useState } from "react";
import { Card, CardHeader, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import { useLazyOveralldataQuery } from "../../../redux/api/admin";

interface AdminReportsProps {
  statesWithPatientsNo: Array<{ _id: string; count: number }>;
  totalpatientCount: number;
}

const AdminReports: FC<AdminReportsProps> = () => {
  const [trigger, { data, error, isLoading }] = useLazyOveralldataQuery();
  const [statesWithPatientsNoData, setStatesWithPatientsNoData] =
    useState<AdminReportsProps>({
      statesWithPatientsNo: [],
      totalpatientCount: 0,
    });
  useEffect(() => {
    const fetchData = async () => {
      // @ts-ignore
      const response = await trigger();
      if (response.data && response.data.success) {
        const { statesWisePatients, totalpatientCount } = response.data.data;
        setStatesWithPatientsNoData({
          statesWithPatientsNo: statesWisePatients.statesWithPatientsNo || [],
          totalpatientCount: totalpatientCount || 0,
        });
      }
    };
    fetchData();
  }, [trigger]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  const {
    totalPatients = 0,
    stateWithMostUser = { state: "Unknown", count: 0 },
    totalKiosksActiveHours = 0,
    kioksWisePatients = [],
    kioskWiseConductedTests = [],
  } = data?.data || {};
  const totalKiosksActiveHoursInHours = totalKiosksActiveHours / (3600 * 1000);
  return (
    <Fragment>
      <Row>
        <Col xl={12}>
          <div className="p-3"></div>
          <Card className="custom-card">
            <Card.Header>
              <h1 className="fs-6 p-1 fw-bold">Analytics</h1>
            </Card.Header>
          </Card>
          <Col xl={12}>
            <Card className="custom-card">
              {/* <Card.Header>
                <Card.Title>Data</Card.Title>
              </Card.Header> */}
              <Card.Body>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Nav
                    variant="pills"
                    className="nav nav-pills flex-column flex-sm-row mb-3"
                    role="tablist"
                    defaultActiveKey="first"
                  >
                    <Nav.Link
                      className="flex-sm-fill text-sm-center koisk_test_nav"
                      eventKey="first"
                    >
                      Overall
                    </Nav.Link>
                    <Nav.Link
                      className="flex-sm-fill text-sm-center koisk_test_nav"
                      eventKey="second"
                    >
                      Individual Kiosk
                    </Nav.Link>
                  </Nav>
                  <Tab.Content className="tab-content">
                    <Tab.Pane
                      className="text-muted"
                      id="pill-flex-home"
                      role="tabpanel"
                      eventKey="first"
                    >
                      <div className="d-flex justify-content-between">
                        <Card className="custom-card p-3 hrm-main-cardd primary bg-light">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                Total Number of Patients
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <h1 className="fw-semibold fs-1 red-text mt-2">
                                {totalPatients}
                              </h1>
                            </div>
                          </Card.Body>
                        </Card>
                        <Card className="custom-card p-3 hrm-main-cardd ms-4 secondary bg-light">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                State with most Active Users
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-1 red-text mt-1">
                                {stateWithMostUser?.state}{" "}
                                {stateWithMostUser?.count}
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <Card className="custom-card p-3 hrm-main-cardd warning bg-light">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                Total Hours Consultation
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-1 red-text mt-1">
                                120 Hours
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                        <Card className="custom-card p-3 hrm-main-cardd danger ms-4 bg-light ">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                Total Hours Kiosk is Active
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-1 red-text mt-1">
                                {totalKiosksActiveHoursInHours?.toFixed(2)}{" "}
                                Hours
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <Card className="custom-card hrm-main-cardd mt-3">
                        <h1 className="fw-bold fs-6 mt-2">
                          Number of Patients{" "}
                        </h1>
                        <h1 className="red-text fw-bolder fs-1">
                          {totalPatients}
                        </h1>
                        <div className="table-responsive">
                          <Table className="table text-nowrap">
                            <thead>
                              <tr>
                                <td scope="col" className="fw-bold fs-6">
                                  S.No
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  State
                                </td>
                                {/* <td scope="col" className="fw-bold fs-6">Seller</td> */}
                                <td scope="col" className="fw-bold fs-6">
                                  Number of Patients
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {statesWithPatientsNoData?.statesWithPatientsNo
                                .length > 0 ? (
                                statesWithPatientsNoData?.statesWithPatientsNo.map(
                                  (state, index) => (
                                    <tr key={index}>
                                      <td scope="row">{index + 1}</td>
                                      <td scope="row">{state?._id}</td>
                                      <td scope="row">{state?.count}</td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan={3} className="text-center">
                                    No Data Available !!
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                      <Card className="custom-card hrm-main-cardd mt-5">
                        <h1 className="fw-bold fs-6 mt-2">Number of Kiosk</h1>
                        <h1 className="red-text fw-bolder fs-1">
                          {kioksWisePatients?.length}
                        </h1>
                        <div className="table-responsive">
                          <Table className="table text-nowrap">
                            <thead>
                              <tr>
                                <td scope="col" className="fw-bold fs-6">
                                  S.No
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  Kiosk
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  State
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  Number of Patients
                                </td>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              {kioksWisePatients?.length > 0 ? (
                                kioksWisePatients?.map(
                                  (kiosk: any, index: number) => (
                                    <tr key={index}>
                                      <td>{index + 1}.</td>
                                      <td scope="row">
                                        {kiosk.kioskData.name_of_center}
                                      </td>
                                      <td scope="row">
                                        {kiosk.kioskData.state}
                                      </td>
                                      <td>{kiosk.patientCount}</td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan={4} className="text-center">
                                    No Data Available !!
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                      <Card className="custom-card hrm-main-cardd mt-5">
                        <h1 className="fw-bold fs-6 mt-2">Number of Doctors</h1>
                        <h1 className="red-text fw-bolder fs-1">40</h1>
                        <div className="table-responsive">
                          <Table className="table text-nowrap">
                            <thead>
                              <tr>
                                <td scope="col" className="fw-bold fs-6">
                                  S.No
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  List of Doctors
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  State
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  Time Spend
                                </td>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              <tr>
                                <td>1.</td>
                                <td scope="row">Dr.Rakshita</td>
                                <td>Chandigarh</td>
                                <td>01:20:02</td>
                              </tr>
                              <tr>
                                <td>2.</td>
                                <td scope="row">Dr.Ameer</td>
                                <td>Punjab</td>
                                <td>02:09:01</td>
                              </tr>
                              <tr>
                                <td>3.</td>
                                <td scope="row">Dr.Riya</td>
                                <td>Haryana</td>
                                <td>02:09:01</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                      <Card className="custom-card hrm-main-cardd mt-5">
                        <h1 className="fw-bold fs-6 mt-2">
                          Number of Test Conducted
                        </h1>
                        <h1 className="red-text fw-bolder fs-1">
                          {kioskWiseConductedTests?.length}
                        </h1>
                        <div className="table-responsive">
                          <Table className="table text-nowrap">
                            <thead>
                              <tr>
                                <td scope="col" className="fw-bold fs-6">
                                  S.No
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  List of Kiosk
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  Number of Test
                                </td>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              {kioskWiseConductedTests.length > 0 ? (
                                kioskWiseConductedTests.map(
                                  (kiosk: any, index: any) => (
                                    <tr key={index}>
                                      <td>{index + 1}.</td>
                                      <td scope="row">
                                        {kiosk?.kioskData?.name_of_center}
                                      </td>
                                      <td>{kiosk?.completedTestsCount}</td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan={4} className="text-center">
                                    No Data Available !!
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane
                      className="text-muted"
                      id="pill-flex-big"
                      role="tabpanel"
                      eventKey="second"
                    >
                      <CardHeader className="d-flex justify-content-end">
                        <Col xl="3">
                          {/* <Select
                              name="colors"
                              options={Multipleselectdata12}
                              className="default basic-multi-select"
                              id="choices-multiple-default"
                              menuPlacement="auto"
                              classNamePrefix="Select2"
                              defaultValue={[Multipleselectdata12[0]]}
                            /> */}
                        </Col>
                      </CardHeader>
                      <div className="d-flex justify-content-between">
                        <Card className="custom-card p-3 hrm-main-cardd primary bg-light">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                Total Number of Patients
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-1 red-text">
                                241
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                        <Card className="custom-card p-3 hrm-main-cardd ms-4 bg-light primary">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                State with most Active Users
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-1 red-text">
                                Delhi (37)
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Card className="custom-card p-3 hrm-main-cardd primary bg-light">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                Total Hours Consultation
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-1 red-text">
                                120 Hours
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                        <Card className="custom-card p-3 hrm-main-cardd ms-4 bg-light primary">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                Total Hours Kiosk is Active
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-1 red-text">
                                168 Hours
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <Card className="custom-card hrm-main-cardd primary mt-3">
                        <h1 className="fw-bold fs-6 mt-2">
                          Number of Patients
                        </h1>
                        <h1 className="red-text fw-bolder ">241</h1>
                        <div className="table-responsive">
                          <Table className="table text-nowrap">
                            <thead>
                              <tr>
                                <td scope="col" className="fw-bold fs-6">
                                  S.No
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  State
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  Number of Patients
                                </td>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              <tr>
                                <td>1.</td>
                                <td scope="row">Andhra Pradesh</td>
                                <td>10</td>
                              </tr>
                              <tr>
                                <td>2.</td>
                                <td scope="row">Arunachal Pradesh</td>
                                <td>20</td>
                              </tr>
                              <tr>
                                <td>3.</td>
                                <td scope="row">Assam</td>
                                <td>15</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                      <Card className="custom-card hrm-main-cardd primary mt-5">
                        <h1 className="fw-bold fs-6 mt-2">
                          Number of Patients
                        </h1>
                        <h1 className="red-text fw-bolder fs-1 ">241</h1>
                        <div className="table-responsive">
                          <Table className="table text-nowrap">
                            <thead>
                              <tr>
                                <td scope="col" className="fw-bold fs-6">
                                  S.No
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  Kiosk
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  State
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  Number of Patients
                                </td>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              <tr>
                                <td>1.</td>
                                <td scope="row">Kiosk 1</td>
                                <td scope="row">Arunachal Pradesh</td>
                                <td>10</td>
                              </tr>
                              <tr>
                                <td>2.</td>
                                <td scope="row">Kiosk 2</td>
                                <td scope="row">Arunachal Pradesh</td>
                                <td>20</td>
                              </tr>
                              <tr>
                                <td>3.</td>
                                <td scope="row">Kiosk 3</td>
                                <td scope="row">Assam</td>
                                <td>2</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                      <Card className="custom-card hrm-main-cardd primary mt-5">
                        <h1 className="fw-bold fs-6 mt-2">Number of Doctors</h1>
                        <h1 className="red-text fw-bolder fs-1">40</h1>
                        <div className="table-responsive">
                          <Table className="table text-nowrap">
                            <thead>
                              <tr>
                                <td scope="col" className="fw-bold fs-6">
                                  S.No
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  List of Doctors
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  State
                                </td>
                                <td scope="col" className="fw-bold fs-6">
                                  Time Spend
                                </td>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              <tr>
                                <td>1.</td>
                                <td scope="row">Dr.Rakshita</td>
                                <td>Chandigarh</td>
                                <td>01:20:02</td>
                              </tr>
                              <tr>
                                <td>2.</td>
                                <td scope="row">Dr.Ameer</td>
                                <td>Punjab</td>
                                <td>02:09:01</td>
                              </tr>
                              <tr>
                                <td>3.</td>
                                <td scope="row">Dr.Riya</td>
                                <td>Haryana</td>
                                <td>02:09:01</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AdminReports;
