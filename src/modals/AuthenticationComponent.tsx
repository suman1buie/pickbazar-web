import { useState } from "react";
import "./AuthenticationComponent.css";
import LogoIamge from "../assets/Logo-new.webp";
import { Button } from "antd";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { login } from "../api/signIn";
import { Spin } from "antd";
import { register, verifyOTP } from "../api/register";
import { userInfo } from "../api/getUserInfo";

type AuthenticationComponentProps = {
  type: string;
  showLoading: (type?: string) => void;
};

const AuthenticationComponent = ({
  type,
  showLoading,
}: AuthenticationComponentProps) => {
  const [otp, setOtp] = useState<string | undefined>(undefined);
  const [otpSendFlag, setOtpSendFlag] = useState<boolean | undefined>(false);
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const restEverything = (type: string) => {
    setEmail("");
    setName("");
    setOtp(undefined);
    setPassword("");
    setUsername("");
    showLoading(type);
  };

  const onChange = (name: string, event: any): void => {
    if (name === "username") {
      setUsername(event.target.value);
    } else if (name === "password") {
      setPassword(event.target.value);
    } else if (name === "name") {
      setName(event.target.value);
    } else if (name === "email") {
      setEmail(event.target.value);
    } else if (name === "otp") {
      setOtp(event.target.value);
    }
  };

  const doLogin = async () => {
    setLoading(true);
    await login({
      username: username,
      password: password,
    });
    const userData = await userInfo();
    console.log(userData);
    setLoading(false);
  };

  const doRegister = async () => {
    const resp = await register({
      username: username,
      name: name,
      password: password,
      email: email,
    });
    setOtpSendFlag(resp);
  };

  const soSubmit = async (type: string) => {
    setLoading(true);
    if (type === "register") {
      if (!otpSendFlag) {
        await doRegister();
      } else {
        const resp = await verifyOTP({
          otp: otp,
          email: email,
        });
        if (resp) {
          restEverything("login");
        }
      }
      setLoading(false);
    } else {
      doLogin();
    }
    setLoading(false);
  };

  const checkDisable = (type: string): boolean => {
    if (type === "register") {
      return !(
        username.trim().length > 0 &&
        password.trim().length > 0 &&
        name.trim().length > 0 &&
        email.trim().length > 0
      );
    }
    return !(username.trim().length > 0 && password.trim().length > 0);
  };

  return (
    <div className="outer-wrapper">
      <div className="image-wrapper">
        <img src={LogoIamge} style={{ height: "25px", width: "120px" }} />
      </div>
      <Spin spinning={loading}>
        {(type === "register" && !otpSendFlag) || type !== "register" ? (
          <>
            {type === "register" ? (
              <div className="signin-headline">
                By signing up, you agree to ourterms & policy
              </div>
            ) : (
              <div className="signin-headline">
                Login with your email & password
              </div>
            )}

            {type === "register" ? (
              <>
                <div className="input-wrapper">
                  <div>Email</div>
                  <input
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    className="input-text"
                    onChange={(e) => onChange("email", e)}
                  />
                </div>
                <div className="input-wrapper">
                  <div>Name</div>
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter your full name"
                    className="input-text"
                    onChange={(e) => onChange("name", e)}
                  />
                </div>
              </>
            ) : null}

            <div className="input-wrapper">
              <div>Username</div>
              <input
                type="text"
                placeholder="Enter a unique username"
                className="input-text"
                value={username}
                onChange={(e) => onChange("username", e)}
              />
            </div>
            <div className="input-wrapper">
              <div>Password</div>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                className="input-text"
                onChange={(e) => onChange("password", e)}
              />
            </div>
            <Button
              className="login-button"
              onClick={() => soSubmit(type)}
              disabled={checkDisable(type)}
            >
              {type === "register" ? "Register" : "Login"}
            </Button>
            <div className="border-wrapper">
              <div className="left-arrow"></div>
              <div>or</div>
              <div className="right-arrow"></div>
            </div>
          </>
        ) : (
          <div className="outer-wrapper">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              inputStyle={{
                width: "100%",
                height: "50px",
                fontSize: "24px",
                color: "#009f7f",
                border: "1px solid black",
                borderRadius: "15px",
              }}
              containerStyle={{ gap: "10px" }}
              renderInput={(props) => <input {...props} />}
            />
            <Button
              className="login-button"
              onClick={() => soSubmit(type)}
              disabled={!(otp?.length === 5)}
            >
              Submit OTP
            </Button>
          </div>
        )}
        <div className="register-section">
          {type === "register" ? (
            <>
              {otpSendFlag ? (
                <>
                  Want back to ?{" "}
                  <Link
                    to={"/"}
                    onClick={() => {
                      restEverything("register");
                      setOtpSendFlag(false);
                    }}
                  >
                    Register form
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  Don't have any account?{" "}
                  <Link to={"/"} onClick={() => restEverything("login")}>
                    Login
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              Don't have any account?{" "}
              <Link to={"/"} onClick={() => restEverything("register")}>
                Register
              </Link>
            </>
          )}
        </div>
      </Spin>
    </div>
  );
};

export default AuthenticationComponent;
