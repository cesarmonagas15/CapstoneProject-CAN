import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export default function Popup({ isModalOpen, setIsModalOpen }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRegister = () => {
    navigate("/register"); // Navigate to register when this function is called
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        style={{ top: 20 }}
        title="Save Your Favorite Recipes! 🥗"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Not now
          </Button>,
          <Button type="primary" danger onClick={handleLogin}>
            Sign in
          </Button>,
          <Button danger onClick={handleRegister}>
            Register
          </Button>,
        ]}
      >
        <p>
          Sign in or register to save your favorite recipes and enjoy a
          personalized cooking journey.
        </p>
        <br></br>
      </Modal>
    </>
  );
}
