import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const ViewSentMail = (props) => {
  const backClickHandler = () => {
    props.onBackClick();
  };

  return (
    <div className="mt-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Row>
            <Col md={12}>
              <h3 className="text-primary">{props.mail.subject}</h3>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <strong>To:</strong> {props.mail.recepient}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <Card className="border-0 shadow-sm">
                <Card.Body>{props.mail.message}</Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12} className="text-end">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={backClickHandler}
              >
                Back
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewSentMail;
