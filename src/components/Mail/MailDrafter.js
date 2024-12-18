import { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendMail } from "../../store/sendMailThunk";

const MailDrafter = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [editorState, setEditorState] = useState(null);

  const recepientRef = useRef();
  const subjectRef = useRef();

  const editorStateChangeHandler = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const sendMailHandler = (event) => {
    event.preventDefault();

    const enteredRecepient = recepientRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const enteredMessage = editorState.getCurrentContent().getPlainText();

    const draftedMail = {
      recepient: enteredRecepient,
      subject: enteredSubject,
      message: enteredMessage,
    };

    dispatch(sendMail(draftedMail));
    history.push("/outbox");
  };

  return (
    <Card className="mx-auto shadow-sm" style={{ maxWidth: "800px" }}>
      <Card.Header className="text-center">
        <h3>Compose New Mail</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={sendMailHandler}>
          <Form.Group controlId="recepient">
            <Form.Label>Recepient</Form.Label>
            <Form.Control
              type="email"
              ref={recepientRef}
              placeholder="Recepient email"
              required
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              ref={subjectRef}
              placeholder="Subject"
              required
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <div
              className="border rounded mb-3"
              style={{
                minHeight: 300,
                padding: "10px",
              }}
            >
              <Editor
                editorState={editorState}
                onEditorStateChange={editorStateChangeHandler}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
              />
            </div>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Send
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MailDrafter;
