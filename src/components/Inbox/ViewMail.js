import React, { useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";

const ViewMail = (props) => {
  const dispatch = useDispatch();

  const { error, sendRequest } = useHttp();

  useEffect(() => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");

    sendRequest({
      url: `https://mailboxclient-7826f-default-rtdb.firebaseio.com/inbox/${processedEmail}/${props.mail.id}.json`,
      method: "PUT",
      body: {
        message: props.mail.message,
        sender: props.mail.sender,
        subject: props.mail.subject,
        read: true,
      },
    });

    if (!error) {
      dispatch(mailActions.updateReadReceipt(props.mail.id));
    }
    if (error) {
      console.log("Error updating read receipt: " + error);
    }
  }, [dispatch, props.mail, sendRequest, error]);

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
              <strong>From:</strong> {props.mail.sender}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <Card className="border-0 shadow-sm">
                <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                  {props.mail.message}
                </Card.Body>
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

export default ViewMail;
