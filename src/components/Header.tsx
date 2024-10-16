import "../css/Header.css";
import LogoIamge from "../assets/Logo-new.webp";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useState } from "react";
import AuthenticationComponent from "../modals/AuthenticationComponent";
import { useSelector } from "react-redux";

type HeaderType = {
  isLogedIn?: boolean;
};

const Header = ({}: HeaderType): JSX.Element => {
  const navigate = useNavigate();
  const isLogedIn = useSelector((state: any) => state.user.user.isLoggedIn);

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("login");

  const showLoading = (type = "login") => {
    setOpen(true);
    setType(type);
    setLoading(false);
  };

  return (
    <div className="header-wrapper">
      <div className="header-logo-wrapper">
        <img src={LogoIamge} style={{ height: "25px", width: "150px" }} />
      </div>
      <div className="menu-div">
        <span className="tex-link" onClick={() => navigate("/")}>
          Home
        </span>
        <span className="tex-link" onClick={() => navigate("/about")}>
          About us
        </span>
        <span className="tex-link" onClick={() => navigate("/contact")}>
          Contact
        </span>
        <span className="tex-link" onClick={() => navigate("/pages")}>
          Pages
        </span>
        {!isLogedIn ? (
          <div className="bnt-group">
            <button className="login-btn" onClick={() => showLoading("login")}>
              Login
            </button>
            <button
              className="signup-btn"
              onClick={() => showLoading("register")}
            >
              Register as user
            </button>
          </div>
        ) : (
          <div>Profile</div>
        )}
        <Modal
          title={null}
          footer={null}
          loading={loading}
          open={open}
          onCancel={() => setOpen(false)}
        >
          <AuthenticationComponent type={type} showLoading={showLoading} />
        </Modal>
      </div>
    </div>
  );
};

export default Header;
