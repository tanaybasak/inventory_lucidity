import React from "react";
import { Navbar, Form } from "react-bootstrap";
import { useAuth } from "../AuthContext";

const AppNavbar: React.FC = () => {
    const { isAdmin, setIsAdmin } = useAuth(); // Access context values

  const handleSwitchChange = () => {
    setIsAdmin((prevState) => !prevState);
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-4 py-2 backgrnd">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="ms-auto d-flex align-items-center gap-3">
          <Form.Label className="mb-0">User</Form.Label>
          <Form.Check
            type="switch"
            id="role-switch"
            checked={isAdmin}
            onChange={handleSwitchChange}
          />
          <Form.Label className="mb-0">Admin</Form.Label>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
