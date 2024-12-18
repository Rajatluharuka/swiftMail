import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";

const OutboxMailList = (props) => {
  const { error, sendRequest } = useHttp();

  const outbox = useSelector((state) => state.mail.outbox);
  const dispatch = useDispatch();

  const deleteMailHandler = (mailItemId) => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");

    sendRequest({
      url: `https://mailboxclient-7826f-default-rtdb.firebaseio.com/outbox/${processedEmail}/${mailItemId}.json`,
      method: "DELETE",
    });

    if (!error) {
      dispatch(mailActions.deleteOutboxMail(mailItemId));
      console.log("Mail deleted successfully.");
    }
    if (error) {
      console.log("Error deleting mail: " + error);
    }
  };

  const mailItems = outbox.map((mail) => {
    return (
      <Card key={mail.id} className="mb-3 shadow-sm border-0">
        <Card.Body className="p-3 d-flex align-items-center">
          <Row className="w-100">
            <Col
              xs={3}
              className="text-truncate"
              style={{ cursor: "pointer" }}
              onClick={props.onMailClick.bind(null, mail)}
            >
              <strong>{mail.recepient}</strong>
            </Col>
            <Col
              xs={6}
              className="text-truncate"
              style={{ cursor: "pointer" }}
              onClick={props.onMailClick.bind(null, mail)}
            >
              {mail.subject}
            </Col>
            <Col xs={3} className="text-end">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={deleteMailHandler.bind(null, mail.id)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Container fluid className="mt-3">
      <h5 className="mb-4 text-primary">Outbox</h5>
      {mailItems.length > 0 ? (
        mailItems
      ) : (
        <Card className="shadow-sm border-0">
          <Card.Body className="text-center">No emails to display.</Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default OutboxMailList;
