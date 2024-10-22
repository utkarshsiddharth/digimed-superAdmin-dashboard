/* eslint-disable linebreak-style */
import { Fragment, useEffect, useState } from "react";
import { Row, Col, Table, Card, CardBody, Modal,Form, InputGroup } from "react-bootstrap";
import { useAllAdminQuery } from "../../../../redux/api/superAdmin";
import AnimatedLogo from "../../../../components/AnimatedLogo";
import { useForm } from "react-hook-form";

const Admin = ({ orgId }: any) => {
  const [adminList, setAdminList] = useState<any>([]);
  const [updateAdminModel,setUpdateAdminModel] = useState(false)

  // const [selectedId, setSelectedId] = useState(null);
  const [loader] = useState(false);
  
  const { data, isLoading } = useAllAdminQuery(orgId);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    setAdminList(data?.data);
  }, [data,orgId]);
if(isLoading){
    return  <AnimatedLogo />

}

const onSubmit = async (data: any) => {
  console.log(data)
}
  return (
    <Fragment>
  
      <Row>

        <Col>
          <div style={{ position: "absolute" }}></div>
          <Card>
            <CardBody>
              <div className="table-responsive">
                <Table className="table text-nowrap border-success">
                  <thead>
                    <tr>    
                      <td scope="col" className="fw-bold">
                        S.No
                      </td>
                      <td scope="col" className="fw-bold">
                        Email
                      </td>
                      <td scope="col" className="fw-bold">
                        Add Date
                      </td>

                      <td scope="col" className="fw-bold">
                        Action
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {adminList &&
                      adminList?.map((item: any, index: any) => (
                        <tr key={index} className="">
                          <td scope="row" className="">
                           {index+1}
                          </td>
                          <td className="">{item?.email}</td>
                          <td className="">{new Date(item?.createdAt).toLocaleDateString()}</td>

                          <td className="d-flex gap-3">
                            
                            <span 
                              // onClick={() => {
                                
                                
                              //   setUpdateAdminModel(true);
                              //   onToggleText()
                              //   setSelectedId(item?._id);
                            
                              // }}
                            >
                            
                              
                              <i className="bi bi-pencil-square fs-4"></i>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal
        backdrop={"static"}
        animation={false}
        centered
        show={updateAdminModel}
        onHide={() => setUpdateAdminModel(false)}
        keyboard={false}
        className="modal fade"
        size="xl"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton >
            <Modal.Title as="h6">Edit Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Row >
              <Col xl={12} className="mt-2">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  className=""
                  placeholder="Enter Admin Email ID"
                  aria-label="Email"
                  {...register("email", {
                    required: "Email is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </Col>

              <Col md={12} className="mt-2">
                <Form.Label>Password</Form.Label>
                <InputGroup className="">
                  <Form.Control
                    className="form-control"
                    placeholder="Enter Admin Password"
                    aria-label="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Col md={12} className="d-flex justify-content-end mt-3">
              <button
              
                //  variant="primary"
                
                className=" border-0 bg-bluee rounded-2 py-2 px-4 fw-semibold fs-6 text-fixed-white"
                disabled={loader}
              >
                {loader ? (
                  <button
                    className="border-0 blue-bg rounded-2 ms-2 px-4 fw-semibold fs-6 text-fixed-white bg-bluee"
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
                  <span className="fs-15 fw-semibold">Sumbit</span>
                )}
              </button>
            </Col>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default Admin;
