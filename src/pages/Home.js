import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const userMail = localStorage.getItem("email");
  return (
    <Container>
      <h1>Welcome to your mail box</h1>
      <h2>{userMail}</h2>
      <Link to="/inbox">You have unread mail!</Link>
    </Container>
  );
};

export default Home;
