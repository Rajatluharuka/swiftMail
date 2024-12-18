import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { mailActions } from "../../store/mail-slice";
import InboxMailList from "./InboxMailList";
import SideMenu from "../Mail/SideMenu";
import ViewMail from "./ViewMail";

const Inbox = () => {
  const history = useHistory();
  const { error, sendRequest } = useHttp();
  const dispatch = useDispatch();

  const [viewingMode, setViewingMode] = useState(false);
  const [viewedMail, setViewedMail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processedEmail = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");

    setLoading(true);

    const fetchEmails = () => {
      sendRequest(
        {
          url: `https://mailboxclient-7826f-default-rtdb.firebaseio.com/inbox/${processedEmail}.json`,
        },
        (data) => {
          if (data) {
            const keys = Object.keys(data);
            const inboxArray = keys.map((key) => ({
              ...data[key],
              id: key,
            }));
            dispatch(mailActions.setInbox(inboxArray));
          }
          setLoading(false);
        }
      );
    };

    fetchEmails();
    const intervalId = setInterval(fetchEmails, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch, sendRequest]);

  const composeMailHandler = () => {
    history.push("/draft-mail");
  };

  const viewModeHandler = (mail) => {
    setViewingMode((prevMode) => !prevMode);
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
              {!viewingMode && <InboxMailList onMailClick={viewModeHandler} />}
              {viewingMode && (
                <ViewMail mail={viewedMail} onBackClick={viewModeHandler} />
              )}
              {error && <p className="text-danger text-center">{error}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Inbox;
