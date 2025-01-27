import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

interface EditModalProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  modalData: {
    name: string;
    category: string;
    price: string;
    quantity: number;
    value: string;
  } | null;
  setModalData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      category: string;
      price: string;
      quantity: number;
      value: string;
    } | null>
  >;
}

const EditModal: React.FC<EditModalProps> = ({
  show,
  onClose,
  onSave,
  modalData,
  setModalData,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered className="modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalData && (
          <>
            <Modal.Title>{modalData.name}</Modal.Title>

            <Form>
              <Row className="mb-3 mt-2">
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={modalData.category}
                      onChange={(e) =>
                        setModalData({ ...modalData, category: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={modalData.price}
                      onChange={(e) =>
                        setModalData({ ...modalData, price: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={modalData.quantity}
                      onChange={(e) =>
                        setModalData({
                          ...modalData,
                          quantity: parseInt(e.target.value, 10),
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                      type="text"
                      value={modalData.value}
                      onChange={(e) =>
                        setModalData({ ...modalData, value: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave} className="btn_modal">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
