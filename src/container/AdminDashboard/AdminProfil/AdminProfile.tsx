/* eslint-disable linebreak-style */
import { Fragment, useEffect, useState } from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import { useAdminProfileQuery, useUpdateProfileMutation } from "../../../redux/api/admin";
import { useForm } from "react-hook-form";
import Loader from "../../../components/common/loader/loader";

const AdminProfile = () => {
  const { data, isSuccess, isError } = useAdminProfileQuery("");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [profileData, setProfileData] = useState<any>();
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (formData: any) => {
    try {
      const result = await updateProfile(formData).unwrap();
      console.log("Profile updated successfully:", result);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const profile = data?.data;
      setProfileData(profile);
      console.log(profileData);
      setValue("first_name", profile?.first_name || "");
      setValue("last_name", profile?.last_name || "");
      setValue("date_of_birth", profile?.date_of_birth || "");
      setValue("contact_number", profile?.contact_number || "");
      setValue("email", profile?.email || "");
      setValue("marital_status", profile?.marital_status || "");
      setValue("city", profile?.city || "");
      setValue("country", profile?.country || "");
      setValue("address", profile?.address || "");
      setValue("state", profile?.state || "");
      setValue("old_password", profile?.password || "");
      setValue("new_password", "");
      setValue("retype_password", "");
    } else if (isError) {
      console.error("Failed to fetch profile data:", isError);
    }
  }, [isSuccess, isError, setValue]);

  return (
    <Fragment>
      <Row>
        <Col xxl={12} xl={8} className="mt-5">
          <Card className="custom-card upload-nft">
            <Card.Header>
              <h1 className="fs-6 fw-bold">Profile</h1>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row gy-3 justify-content-between">
                  <Col xxl={8} xl={12}>
                    <div className="row gy-3">
                      <Col xl={6}>
                        <Form.Label className="form-label">First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your First Name"
                          {...register("first_name", { required: true })}
                        />
                      </Col>
                      {errors.name_of_center && <span className="text-white">This field is required</span>}
                      <Col xl={6}>
                        <Form.Label className="form-label">Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your LastName"
                          {...register("last_name", { required: true })}
                        />
                      </Col>
                      <Col xl={6}>
                        <Form.Label className="form-label">D.O.B</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Enter your Date of Birth"
                          {...register("date_of_birth", { required: "Date of birth is required" })}
                        />
                      </Col>
                      <Col xl={6}>
                        <Form.Label className="form-label">Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your Contact Number"
                          {...register("contact_number", { required: true })}
                        />
                      </Col>
                      <Col xl={6}>
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your Email"
                          {...register("email", { required: true })}
                        />
                      </Col>
                      <Col xl={6}>
                        <Form.Label className="form-label">Marital Status</Form.Label>
                        <div className="d-flex gap-5">
                          <div className="form-check mb-2">
                            <input
                              type="radio"
                              className="form-check-input"
                              value="married"
                              {...register("marital_status", { required: true })}
                            />
                            <label className="form-check-label">Married</label>
                          </div>
                          <div className="form-check mb-2">
                            <input
                              type="radio"
                              className="form-check-input"
                              value="single"
                              {...register("marital_status", { required: true })}
                            />
                            <label className="form-check-label">Single</label>
                          </div>
                        </div>
                      </Col>
                      <Col xl={6}>
                        <Form.Label className="form-label">Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your Address"
                          {...register("address", { required: true })}
                        />
                      </Col>
                      <Col xl={6}>
                        <Form.Label className="form-label">State</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your State Name"
                          {...register("state", { required: true })}
                        />
                      </Col>
                      <Col xl={6}>
                        <Form.Label className="form-label">City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your City Name"
                          {...register("city", { required: true })}
                        />
                      </Col>
                      <Col xl={6}>
                        <Form.Label className="form-label">Country</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your Country Name"
                          {...register("country", { required: true })}
                        />
                      </Col>
                    </div>
                  </Col>
                </div>
                <Row className="mt-5">
                  <h1 className="fs-6 fw-bold red-text">Change your Password</h1>
                  <Col xl={4}>
                    <Form.Label className="form-label">Old Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your Old Password"
                      {...register("old_password", { required: true })}
                    />
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="form-label">New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your New Password"
                      {...register("new_password", { required: true })}
                    />
                  </Col>
                  <Col xl={4}>
                    <Form.Label className="form-label">Re-New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your Re-New Password"
                      {...register("retype_password", { required: true })}
                    />
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                <button
                    type="submit"
                    className="border-0 bg-bluee rounded-2 py-2 px-3 mt-3 mb-5 fw-semibold fs-6 text-fixed-white button"
                  >
                    Update
                  </button>
                  </div>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {isLoading && <Loader />}
    </Fragment>
  );
};

export default AdminProfile;