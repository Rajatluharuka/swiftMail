import React from "react";
import { Badge, Card, Nav, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const SideMenu = () => {
  const inbox = useSelector((state) => state.mail.inbox);

  const unreadMailCount = inbox.reduce((count, mail) => {
    if (mail.read === "false" || mail.read === false) {
      count++;
    }
    return count;
  }, 0);

  return (
    <Container fluid>
      <Row>
        <Col className="p-3">
          <Card className="shadow-sm border rounded">
            <Card.Body>
              <Nav className="flex-column">
                <Nav.Link
                  href="/inbox"
                  className="d-flex justify-content-between align-items-center"
                >
                  Inbox
                  {unreadMailCount > 0 && (
                    <Badge pill bg="danger">
                      {unreadMailCount}
                    </Badge>
                  )}
                </Nav.Link>
                <Nav.Link href="/outbox">Outbox</Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SideMenu;
