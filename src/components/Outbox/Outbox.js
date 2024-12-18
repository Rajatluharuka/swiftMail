import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";
import SideMenu from "../Mail/SideMenu";
import OutboxMailList from "./OutboxMailList";
import ViewSentMail from "./ViewSentMail";

const Outbox = () => {
  const history = useHistory();
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState(false);
  const [viewedMail, setViewedMail] = useState(null);
  const [loading, setLoading] = useState(true);

  const processedEmail = localStorage
    .getItem("email")
    ?.replace("@", "")
    .replace(".", "");

  useEffect(() => {
    if (!processedEmail) {
      console.error("No user email found in localStorage!");
      return;
    }
    setLoading(true);

    sendRequest(
      {
        url: `https://mailboxclient-7826f-default-rtdb.firebaseio.com/outbox/${processedEmail}.json`,
      },
      (data) => {
        if (data) {
          const outboxArray = Object.keys(data).map((key) => ({
            ...data[key],
            id: key,
          }));
          dispatch(mailActions.setOutbox(outboxArray));
        } else {
          dispatch(mailActions.setOutbox([]));
        }
        setLoading(false);
      }
    );
  }, [processedEmail, sendRequest, dispatch, error]);

  const composeMailHandler = () => {
    history.push("/draft-mail");
  };

  const viewModeHandler = (mail) => {
    setViewMode((prevMode) => !prevMode);
    setViewedMail(mail);
  };

  return (
    <Container fluid className="p-3">
      <Row>
        <Col md={3} lg={2}>
          <div className="p-3">
            <Button
              variant="primary"
              className="w-100 mb-3"
              onClick={composeMailHandler}
            >
              Compose
            </Button>
          </div>
          <SideMenu />
        </Col>

        <Col md={9} lg={10}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              {loading && <div>Loading...</div>}
              {!viewMode && <OutboxMailList onMailClick={viewModeHandler} />}
              {viewMode && (
                <ViewSentMail mail={viewedMail} onBackClick={viewModeHandler} />
              )}
              {error && (
                <div className="alert alert-danger">{`Error: ${error}`}</div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Outbox;
