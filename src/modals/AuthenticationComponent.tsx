import "./AuthenticationComponent.css";
import LogoIamge from "../assets/Logo-new.webp";
import { Button } from "antd";
import { Link } from "react-router-dom";

type AuthenticationComponentProps = {
  type: string;
  showLoading: (type?: string) => void;
};

const AuthenticationComponent = ({
  type,
  showLoading,
}: AuthenticationComponentProps) => {
  return (
    <div className="outer-wrapper">
      <div className="image-wrapper">
        <img src={LogoIamge} style={{ height: "25px", width: "120px" }} />
      </div>
      {type === "register" ? (
        <div className="signin-headline">
          By signing up, you agree to ourterms&policy
        </div>
      ) : (
        <div className="signin-headline">Login with your email & password</div>
      )}

      {type === "register" ? (
        <>
          <div className="input-wrapper">
            <div>Username</div>
            <input type="text" placeholder="Username" className="input-text" />
          </div>
          <div className="input-wrapper">
            <div>Name</div>
            <input type="text" placeholder="Name" className="input-text" />
          </div>
        </>
      ) : null}

      <div className="input-wrapper">
        <div>Email</div>
        <input type="email" placeholder="Email" className="input-text" />
      </div>
      <div className="input-wrapper">
        <div>Password</div>
        <input type="password" placeholder="Password" className="input-text" />
      </div>
      <Button className="login-button">
        {type === "register" ? "Register" : "Login"}
      </Button>
      <div className="border-wrapper">
        <div className="left-arrow"></div>
        <div>or</div>
        <div className="right-arrow"></div>
      </div>

      <div className="register-section">
        {type === "register" ? (
          <>
            {" "}
            Don't have any account?{" "}
            <Link to={"/"} onClick={() => showLoading("login")}>
              Login
            </Link>
          </>
        ) : (
          <>
            {" "}
            Don't have any account?{" "}
            <Link to={"/"} onClick={() => showLoading("register")}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthenticationComponent;
