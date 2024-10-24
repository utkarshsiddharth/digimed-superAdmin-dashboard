/* eslint-disable linebreak-style */
import { FC, Fragment, useEffect, useState } from "react";
import { Card, CardHeader, Col, Nav, Row, Tab, Table } from "react-bootstrap";
import {
  useLazyGetStateWisePatientsQuery,
  useIndividualtoppotionQuery,
  useLazyOveralldataQuery,
  useSelectorganisationQuery,
  useLazyGetKiosksWisePatientsQuery,
  useIndividualtoppotionKioskQuery,
  useLazyKioskWiseConductedTestsQuery,
} from "../../../redux/api/superAdmin";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Loader from "../../../components/common/loader/loader";
import AnimatedLogo from "../../../components/AnimatedLogo";
interface AdminReportsProps {
  statesWithPatientsNo: Array<{ _id: string; count: number }>;
  totalpatientCount: number;
}

const AdminReports: FC<AdminReportsProps> = () => {
  const [trigger, { data, error, isLoading }] = useLazyOveralldataQuery<any>();
  const [orgId, setOrgId] = useState(null);

  const [selectedKioskId, setKioskId] = useState(null);
  const [openCards, setOpenCards] = useState<any>([]);
  const { data: orgdata } = useSelectorganisationQuery("organizations");
  const { data: singleData, isFetching: singleDataLoding } =
    useIndividualtoppotionQuery(orgId);
  const { data: singleKioskData, isFetching: singleDataLodingKiosk } =
    useIndividualtoppotionKioskQuery(selectedKioskId);
  const [
    triggerKioskWiseConductedTests,
    { data: KioskWiseConductedTestsforIndivisual },
  ] = useLazyKioskWiseConductedTestsQuery();

  
  const [
    triggerGetStateWisePatients,
    { data: StateWisePatients, isLoading: StateWisePatientsFetching },
  ] = useLazyGetStateWisePatientsQuery();

  const [
    triggerGetKiosksWisePatients,
    { data: KioskskWisePatients, isLoading: kisoskWiseLoading },
  ] = useLazyGetKiosksWisePatientsQuery();

  const { data: kioskData } = useSelectorganisationQuery("kiosks");
  const [organizations, setOrganizations] = useState([]);
  const [kiosksData, setKioskData] = useState([]);
 
  const toggleTable = (cardNumber: any) => {
    if (orgId) {
      // Trigger the lazy query manually when the table is toggled
      triggerGetStateWisePatients(orgId);
      triggerGetKiosksWisePatients(orgId);
      triggerKioskWiseConductedTests(orgId);
    }
    setOpenCards((prev: any) => {
      if (prev.includes(cardNumber)) {
        return prev.filter((number: any) => number !== cardNumber);
      } else {
        return [...prev, cardNumber];
      }
    });
  };

  const [statesWithPatientsNoData, setStatesWithPatientsNoData] =
    useState<AdminReportsProps>({
      statesWithPatientsNo: [],
      totalpatientCount: 0,
    });

  const {
    totalPatients = 0,
    stateWithMostUser = { state: "Unknown", count: 0 },
    // totalKiosksActiveHours = 0,
    totalHoursConsultationProvided = 0,
    kioksWisePatients = [],
    kioskWiseConductedTests = [],
  } = data?.data || {};

  const totalHoursConsultationProvidedInHours = Math.floor(
    totalHoursConsultationProvided / (3600 * 1000)
  );
  const totalMinutes1 = Math.floor(
    (totalHoursConsultationProvided % (3600 * 1000)) / (60 * 1000)
  );

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
  // useEffect for organization data
  useEffect(() => {
    if (orgdata && orgdata.data) {
      setOrganizations(orgdata.data);
    }
  }, [orgdata]);

  // useEffect for kiosk data
  useEffect(() => {
    if (kioskData && kioskData.data) {
      setKioskData(kioskData.data);
    }
  }, [kioskData]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data</div>;
  }
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
                      Overall Data
                    </Nav.Link>
                    <Nav.Link
                      className="flex-sm-fill text-sm-center koisk_test_nav"
                      eventKey="second"
                    >
                      Individual Data
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
                                {totalHoursConsultationProvidedInHours} Hours{" "}
                                {totalMinutes1} Minutes
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                        {/* <Card className="custom-card p-3 hrm-main-cardd danger ms-4 bg-light ">
                          <Card.Body>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-6">
                                Total Hours Kiosk is Active
                              </span>
                            </div>
                            <div className="d-flex justify-content-center">
                              <span className="fw-semibold fs-1 red-text mt-1">
                                {totalKiosksActiveHoursInHours} Hours{" "}
                                {totalMinutes} Minutes
                              </span>
                            </div>
                          </Card.Body>
                        </Card> */}
                      </div>
                      <Card className="custom-card hrm-main-cardd mt-3">
                        <div className="position-relative">
                          <div
                            className="d-flex justify-content-end justify-item-center"
                            onClick={() => toggleTable(4)}
                            style={{ cursor: "pointer" }}
                          >
                            {openCards.includes(4) ? (
                              <FaChevronUp className="fs-2 mt-4" />
                            ) : (
                              <FaChevronDown className="fs-2 mt-4" />
                            )}
                          </div>
                        </div>
                        <h1 className="fw-bold fs-6 mt-2">
                          Number of Patients{" "}
                        </h1>
                        <h1 className="red-text fw-bolder fs-1">
                          {totalPatients}
                        </h1>
                        {openCards.includes(4) && (
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
                        )}
                      </Card>
                      <Card className="custom-card hrm-main-cardd mt-5">
                        <div className="position-relative">
                          <div
                            className="d-flex justify-content-end justify-item-center"
                            onClick={() => toggleTable(5)}
                            style={{ cursor: "pointer" }}
                          >
                            {openCards.includes(5) ? (
                              <FaChevronUp className="fs-2 mt-4" />
                            ) : (
                              <FaChevronDown className="fs-2 mt-4" />
                            )}
                          </div>
                        </div>
                        <h1 className="fw-bold fs-6 mt-2">Number of Kiosk</h1>
                        <h1 className="red-text fw-bolder fs-1">
                          {kioksWisePatients?.length}
                        </h1>
                        {openCards.includes(5) && (
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
                        )}
                      </Card>
                      {/* <Card className="custom-card hrm-main-cardd mt-5">
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
                      </Card> */}
                      <Card className="custom-card hrm-main-cardd mt-5">
                        <div className="position-relative">
                          <div
                            className="d-flex justify-content-end justify-item-center"
                            onClick={() => toggleTable(6)}
                            style={{ cursor: "pointer" }}
                          >
                            {openCards.includes(6) ? (
                              <FaChevronUp className="fs-2 mt-4" />
                            ) : (
                              <FaChevronDown className="fs-2 mt-4" />
                            )}
                          </div>
                        </div>
                        <h1 className="fw-bold fs-6 mt-2">
                          Number of Test Conducted
                        </h1>
                        <h1 className="red-text fw-bolder fs-1">
                          {kioskWiseConductedTests?.length}
                        </h1>
                        {openCards.includes(6) && (
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
                        )}
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane
                      className="text-muted"
                      id="pill-flex-big"
                      role="tabpanel"
                      eventKey="second"
                    >
                      <div style={{ marginTop: "20px" }}>
                        <Card className="custom-card p-3 hrm-main-cardd primary bg-light">
                          <div className="d-flex flex-row justify-content-between align-items-center w-100">
                            <div className="mb-4 w-50 me-5">
                              <b className="fs-18">Organization</b>
                              <select
                                aria-label="Default select example"
                                className="py-2 w-100 mt-2"
                                style={{
                                  borderRadius: "5px",
                                  padding: "10px",
                                }}
                                onChange={(e: any) => {
                                  const selectedOrg: any = organizations.find(
                                    (item: any) => item.name === e.target.value
                                  );

                                  setOrgId(selectedOrg?._id);
                                  setKioskId(null);
                                }}
                              >
                                {/* Static "All" option */}
                                {orgId ? (
                                  <option className="fs-15" value="">
                                    Select Organization
                                  </option>
                                ) : (
                                  <option
                                    className="fs-15"
                                    value=""
                                    disabled
                                    selected
                                  >
                                    Select Organization
                                  </option>
                                )}

                                {organizations?.map((item: any, index) => (
                                  <option
                                    className="fs-15"
                                    key={index}
                                    value={item.name}
                                  >
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mb-4 w-50">
                              <b className="fs-18">Kiosks</b>
                              <select
                                aria-label="Default select example"
                                className="py-2 w-100 mt-2"
                                style={{
                                  borderRadius: "5px",
                                  padding: "10px",
                                }}
                                onChange={(e: any) => {
                                  const selectedKiosk: any = kiosksData.find(
                                    (item: any) =>
                                      item.name_of_center === e.target.value
                                  );

                                  setKioskId(selectedKiosk?._id);
                                  setOrgId(null);
                                }}
                              >
                                {/* Static "All" option */}
                                {selectedKioskId ? (
                                  <option className="fs-15" value="">
                                    Select Kiosk
                                  </option>
                                ) : (
                                  <option
                                    className="fs-15"
                                    value=""
                                    disabled
                                    selected
                                  >
                                    Select Kiosk
                                  </option>
                                )}
                                {kiosksData?.map((item: any, index) => (
                                  <option
                                    className="fs-15"
                                    key={index}
                                    value={item?.name_of_center}
                                  >
                                    {item?.name_of_center}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </Card>
                      </div>

                      <CardHeader className="d-flex justify-content-end">
                        <Col xl="3"></Col>
                      </CardHeader>

                      {orgId || selectedKioskId ? (
                        <div>
                          {singleDataLoding || singleDataLodingKiosk ? (
                            <AnimatedLogo />
                          ) : (
                            <>
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
                                        {orgId
                                          ? singleData?.data?.totalPatients
                                          : singleKioskData?.data
                                              ?.totalPatients}
                                      </span>
                                    </div>
                                  </Card.Body>
                                </Card>
                                {orgId && (
                                  <Card className="custom-card p-3 hrm-main-cardd ms-4 bg-light primary">
                                    <Card.Body>
                                      <div className="d-flex justify-content-center">
                                        <span className="fw-semibold fs-6">
                                          State with most Active Users
                                        </span>
                                      </div>
                                      <div className="d-flex justify-content-center">
                                        <span className="fw-semibold fs-1 red-text">
                                          {singleData?.data
                                            ?.stateWithMostUser ? (
                                            <>
                                              {
                                                singleData?.data
                                                  ?.stateWithMostUser?.state
                                              }{" "}
                                              (
                                              {
                                                singleData?.data
                                                  ?.stateWithMostUser?.count
                                              }
                                              )
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                )}
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
                                        {orgId
                                          ? (() => {
                                              const totalMilliseconds =
                                                singleData?.data
                                                  ?.totalHoursConsultationProvided ||
                                                0;
                                              const totalHours = Math.floor(
                                                totalMilliseconds / 3600000
                                              ); // Convert to hours
                                              const totalMinutes = Math.floor(
                                                (totalMilliseconds % 3600000) /
                                                  60000
                                              ); // Convert remainder to minutes
                                              return `${totalHours} hrs ${totalMinutes} minutes`;
                                            })()
                                          : (() => {
                                              const totalMilliseconds =
                                                singleKioskData?.data
                                                  ?.totalHourConsultationProvided ||
                                                0;
                                              const totalHours = Math.floor(
                                                totalMilliseconds / 3600000
                                              ); // Convert to hours
                                              const totalMinutes = Math.floor(
                                                (totalMilliseconds % 3600000) /
                                                  60000
                                              ); // Convert remainder to minutes
                                              return `${totalHours} hrs ${totalMinutes} minutes`;
                                            })()}
                                      </span>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </div>
                              {orgId && (
                                <Card className="custom-card hrm-main-cardd primary">
                                  <div className="position-relative">
                                    <div
                                      className="d-flex justify-content-end justify-item-center"
                                      onClick={() => toggleTable(1)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {openCards.includes(1) ? (
                                        <FaChevronUp className="fs-2 mt-4" />
                                      ) : (
                                        <FaChevronDown className="fs-2 mt-4" />
                                      )}
                                    </div>
                                  </div>
                                  <h1 className="fw-bold fs-6 mt-2">
                                    Number of Patients State Wise
                                  </h1>
                                  <h1 className="red-text fw-bolder">
                                    {" "}
                                    {StateWisePatients?.data?.reduce(
                                      (total: number, item: any) =>
                                        total + item.count,
                                      0
                                    )}
                                  </h1>

                                  <div className="table-responsive">
                                    {openCards.includes(1) && (
                                      <>
                                        {StateWisePatientsFetching ? (
                                          <AnimatedLogo />
                                        ) : (
                                          <Table className="table text-nowrap">
                                            <thead>
                                              <tr>
                                                <td
                                                  scope="col"
                                                  className="fw-bold fs-6"
                                                >
                                                  S.No
                                                </td>
                                                <td
                                                  scope="col"
                                                  className="fw-bold fs-6"
                                                >
                                                  State
                                                </td>
                                                <td
                                                  scope="col"
                                                  className="fw-bold fs-6"
                                                >
                                                  Number of Patients
                                                </td>
                                              </tr>
                                            </thead>

                                            <tbody className="table-group-divider">
                                              {StateWisePatients &&
                                                StateWisePatients?.data?.map(
                                                  (item: any, index: any) => (
                                                    <tr>
                                                      <td>{index + 1}</td>
                                                      <td scope="row">
                                                        {item?._id}
                                                      </td>
                                                      <td>{item?.count}</td>
                                                    </tr>
                                                  )
                                                )}
                                            </tbody>
                                          </Table>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </Card>
                              )}

                              {orgId && (
                                <Card className="custom-card hrm-main-cardd primary mt-5">
                                  <div className="position-relative">
                                    <div
                                      className="d-flex justify-content-end justify-item-center"
                                      onClick={() => toggleTable(2)}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {openCards.includes(2) ? (
                                        <FaChevronUp className="fs-2 mt-4" />
                                      ) : (
                                        <FaChevronDown className="fs-2 mt-4" />
                                      )}
                                    </div>
                                  </div>
                                  <h1 className="fw-bold fs-6 mt-2">
                                    Number of Patients Kiosks Wise
                                  </h1>
                                  <h1 className="red-text fw-bolder">
                                    {KioskskWisePatients?.data?.reduce(
                                      (total: number, item: any) =>
                                        total + item.patientCount,
                                      0
                                    )}
                                  </h1>

                                  <div className="table-responsive">
                                    {openCards.includes(2) && (
                                      <>
                                        {kisoskWiseLoading ? (
                                          <AnimatedLogo />
                                        ) : (
                                          <Table className="table text-nowrap">
                                            <thead>
                                              <tr>
                                                <td
                                                  scope="col"
                                                  className="fw-bold fs-6"
                                                >
                                                  S.No
                                                </td>
                                                <td
                                                  scope="col"
                                                  className="fw-bold fs-6"
                                                >
                                                  Kiosk
                                                </td>
                                                <td
                                                  scope="col"
                                                  className="fw-bold fs-6"
                                                >
                                                  State
                                                </td>
                                                <td
                                                  scope="col"
                                                  className="fw-bold fs-6"
                                                >
                                                  Number of Patients
                                                </td>
                                              </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                              {KioskskWisePatients &&
                                                KioskskWisePatients?.data?.map(
                                                  (item: any, index: any) => (
                                                    <>
                                                      <tr>
                                                        <td>{index}</td>
                                                        <td scope="row">
                                                          {
                                                            item?.kioskData
                                                              ?.name_of_center
                                                          }
                                                        </td>
                                                        <td scope="row">
                                                          {
                                                            item?.kioskData
                                                              ?.state
                                                          }
                                                        </td>
                                                        <td>
                                                          {item?.patientCount}
                                                        </td>
                                                      </tr>
                                                    </>
                                                  )
                                                )}
                                            </tbody>
                                          </Table>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </Card>
                              )}
                              <Card className="custom-card hrm-main-cardd primary mt-5">
                                <div className="position-relative">
                                  <div
                                    className="d-flex justify-content-end justify-item-center"
                                    onClick={() => toggleTable(3)} // Pass card number
                                    style={{ cursor: "pointer" }}
                                  >
                                    {openCards.includes(3) ? ( // Check if the third card is open
                                      <FaChevronUp className="fs-2 mt-4" />
                                    ) : (
                                      <FaChevronDown className="fs-2 mt-4" />
                                    )}
                                  </div>
                                </div>
                                <h1 className="fw-bold fs-6 mt-2">
                                  Number of Test Conducted
                                </h1>
                                <h1 className="red-text fw-bolder">
                                  {" "}
                                  {orgId
                                    ? KioskWiseConductedTestsforIndivisual?.data?.reduce(
                                        (total: number, item: any) =>
                                          total + item.completedTestsCount,
                                        0
                                      )
                                    : singleKioskData?.data?.kioskWiseConductedTests?.kioskWiseConductedTests
                                    .reduce(
                                        (total: number, item: any) =>
                                          total + item.completedTestsCount,
                                        0
                                      )}
                                </h1>
                                <div className="table-responsive">
                                  {openCards.includes(3) && ( // Check if the third card is open
                                    <>
                                      {orgId ? (
                                        <Table className="table text-nowrap">
                                          <thead>
                                            <tr>
                                              <td
                                                scope="col"
                                                className="fw-bold fs-6"
                                              >
                                                S.No
                                              </td>
                                              <td
                                                scope="col"
                                                className="fw-bold fs-6"
                                              >
                                                Name Of Center
                                              </td>
                                              <td
                                                scope="col"
                                                className="fw-bold fs-6"
                                              >
                                                State
                                              </td>
                                              <td
                                                scope="col"
                                                className="fw-bold fs-6"
                                              >
                                                City
                                              </td>
                                              <td
                                                scope="col"
                                                className="fw-bold fs-6"
                                              >
                                                Count
                                              </td>
                                            </tr>
                                          </thead>
                                          <tbody className="table-group-divider">
                                            {KioskWiseConductedTestsforIndivisual?.data?.map(
                                              (item: any, index: any) => (
                                                <tr>
                                                  <td>{index + 1}</td>
                                                  <td scope="row">
                                                    {
                                                      item?.kioskData
                                                        ?.name_of_center
                                                    }
                                                  </td>
                                                  <td scope="row">
                                                    {item?.kioskData?.state}
                                                  </td>
                                                  <td scope="row">
                                                    {item?.kioskData?.city}
                                                  </td>

                                                  <td>
                                                    {item?.completedTestsCount}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </Table>
                                      ) : (
                                        <Table className="table text-nowrap">
                                          <thead>
                                            <tr>
                                              <td
                                                scope="col"
                                                className="fw-bold fs-6"
                                              >
                                                S.No
                                              </td>
                                              <td
                                                scope="col"
                                                className="fw-bold fs-6"
                                              >
                                                Test Name
                                              </td>
                                              <td
                                                scope="col"
                                                className="fw-bold fs-6"
                                              >
                                                Completed Test Count
                                              </td>
                                            </tr>
                                          </thead>
                                          <tbody className="table-group-divider">
                                            {singleKioskData?.data?.kioskWiseConductedTests?.kioskWiseConductedTests?.map(
                                              (item: any, index: any) => (
                                                <tr>
                                                  <td>{index + 1}</td>
                                                  <td scope="row">
                                                    {item?._id}
                                                  </td>
                                                  <td>
                                                    {item?.completedTestsCount}
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </Table>
                                      )}
                                    </>
                                  )}
                                </div>
                              </Card>
                            </>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
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
