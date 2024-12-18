import React, { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Spinner, Container } from "react-bootstrap";

const Inbox = React.lazy(() => import("./components/Inbox/Inbox"));
const MailDrafter = React.lazy(() => import("./components/Mail/MailDrafter"));
const Outbox = React.lazy(() => import("./components/Outbox/Outbox"));
const Home = React.lazy(() => import("./pages/Home"));
const RegistrationPage = React.lazy(() => import("./pages/RegistrationPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));

const App = () => {
  const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [mode]);

  const Loader = () => (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Spinner animation="border" role="status" variant="primary"></Spinner>
    </Container>
  );

  return (
    <>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact>
              {isloggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login" exact>
              {isloggedIn ? <Redirect to="/home" /> : <LoginPage />}
            </Route>
            <Route path="/register" exact>
              {isloggedIn ? <Redirect to="/home" /> : <RegistrationPage />}
            </Route>
            <Route path="/home" exact>
              {isloggedIn ? <Home /> : <Redirect to="/" />}
            </Route>
            <Route path="/draft-mail" exact>
              {isloggedIn ? <MailDrafter /> : <Redirect to="/" />}
            </Route>
            <Route path="/inbox" exact>
              {isloggedIn ? <Inbox /> : <Redirect to="/" />}
            </Route>
            <Route path="/outbox" exact>
              {isloggedIn ? <Outbox /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </>
  );
};

export default App;
