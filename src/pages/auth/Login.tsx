import { useState, useEffect, useTransition } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { deviceDetect, browserName } from "react-device-detect";
import { Field, Form, Formik } from "formik";

// components
import "./style.css";
import { ScreenLoading } from "../../components/Loaders";
import { signInSchema, singinInitialState } from "../../validation/Auth.yup.ts";
import FormikErrorMsg from "../../components/common/FormikErrorMsg.tsx";
import FormTitle from "../../components/common/FormTitle";
import CustomButton from "../../components/common/CustomButton";
import { IDeviceInfo, ILoginState } from "../../types/interfaces/auth";
import { handleAxiosError } from "../../utils/HandleAxiosError";
import { useAppDispatch } from "../../redux/hooks/index.ts";
import { mergeCartItems } from "../../redux/slices/CartSlice.ts";
import { loginUser } from "../../redux/slices/AuthSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, startTransition] = useTransition();
  const [deviceInfo, setDeviceInfo] = useState<IDeviceInfo | null>();

  const handleFormSubmit = async (value: ILoginState) => {
    startTransition(async () => {
      try {
        await dispatch(loginUser({ ...value, ...deviceInfo }));

        // after loggedin i am dispatching(merge cart items if any available in localstorage)
        dispatch(mergeCartItems());

        if (location.state) {
          navigate(`/place-order?step=1`, {
            state: location.state,
            replace: true,
          });
        } else {
          navigate("/my-account/edit-profile", { replace: true });
        }
      } catch (error) {
        handleAxiosError({
          error: error,
          onMatch: {
            case: "User not verified, Please verify",
            perform: () =>
              navigate(`/account/verify?${value.email}`, {
                replace: true,
              }),
          },
        });
      }
    });
  };

  useEffect(() => {
    (function () {
      try {
        const device = deviceDetect(navigator.userAgent);
        const info = {
          device: device?.osName || device?.os,
          browser: browserName,
        };
        setDeviceInfo(info);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {isPending && <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />}

      <div className="form-container">
        <div className="form-sub-container">
          <FormTitle text={"Login to your Account"} />

          <Formik
            initialValues={singinInitialState}
            validationSchema={signInSchema}
            onSubmit={(value) => handleFormSubmit(value)}
          >
            {({ handleSubmit }) => (
              <Form>
                <div className="input-container">
                  <Field name="email" placeholder="Email Address" />

                  <FormikErrorMsg name={"email"} />
                </div>

                <div className="input-container">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                  />

                  <FormikErrorMsg name={"password"} />
                </div>

                <CustomButton
                  text={"Login"}
                  // type="submit"
                  className={"form-btn"}
                  onClick={() => handleSubmit()}
                />
              </Form>
            )}
          </Formik>

          {/* <h5>Forgot your Password</h5>
          <span>or</span> */}
          <p>
            Don&apos;t have account{" "}
            <Link
              to="/account/signup"
              style={{ color: "var(--tertiary-color)" }}
            >
              Click here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
