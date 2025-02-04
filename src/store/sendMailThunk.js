import axios from "axios";
import { mailActions } from "./mail-slice";

export const sendMail = (draftedMail) => {
  return async (dispatch) => {
    // Request to senders outbox
    const outbox = async () => {
      const processedEmail = localStorage
        .getItem("email")
        .replace("@", "")
        .replace(".", "");

      try {
        const response = await axios.post(
          `https://mailboxclient-7826f-default-rtdb.firebaseio.com/outbox/${processedEmail}.json`,
          {
            recepient: draftedMail.recepient,
            subject: draftedMail.subject,
            message: draftedMail.message,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        dispatch(mailActions.send({ ...draftedMail, id: response.data.name }));
        console.log("Mail sent!");
        console.log("Message stored in the database");
      } catch (error) {
        console.error("Failed to send mail to outbox:", error.message);
        alert("Failed to send mail. Try again!");
      }
    };

    // Request to receiver's inbox
    const recepientInbox = async () => {
      const processedEmail = draftedMail.recepient
        .replace("@", "")
        .replace(".", "");

      try {
        await axios.post(
          `https://mailboxclient-7826f-default-rtdb.firebaseio.com/inbox/${processedEmail}.json`,
          {
            sender: localStorage.getItem("email"),
            subject: draftedMail.subject,
            message: draftedMail.message,
            read: false,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Message stored in the recipient's inbox");
      } catch (error) {
        console.error(
          "Failed to store message in recipient inbox:",
          error.message
        );
        alert("Failed to send mail to recipient inbox. Try again!");
      }
    };

    try {
      await outbox();
      await recepientInbox();
    } catch (error) {
      console.error("Error sending mail:", error.message);
      alert("Error sending mail: " + error.message);
    }
  };
};
