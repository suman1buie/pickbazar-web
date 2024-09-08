import { useState } from "react";
import "./card.css";
import { Modal } from "antd";

type CardType = {
  image: string;
};

const Card = ({ image }: CardType) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <div className="card-wrapper">
      <div
        className="card-outer-wrapper"
        onClick={() => {
          setOpen(true);
          setLoading(false);
        }}
      >
        <img src={image} className="card-image" />
      </div>
      <div className="card-contant">
        <span className="user-name-content">Suman Mandal</span>
        <span className="catagory">Catgory</span>
        <div className="card-span">
          mage title here mage title here mage title here mage title here
        </div>
      </div>
      <Modal
        title={null}
        footer={null}
        closeIcon={null}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
            borderRadius: "5px",
            objectFit: "cover",
          }}
        >
          <img src={image} alt="click atlocation" height={400} width={400} />
        </div>
      </Modal>
    </div>
  );
};

export default Card;
