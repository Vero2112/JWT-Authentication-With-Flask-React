import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Signup } from "./pages/signup.jsx";
import { Learnmore } from "./pages/learnmore.jsx";
import { Login } from "./pages/login.jsx";
import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/* <Navbar /> */}
          <Routes>
            <Route exact path="/" element={<Home />}></Route>

            <Route exact path="/login" element={<Login />}></Route>
            {/* <Route exact path="/user/:id" element={<Learnmore />}></Route> */}
            <Route exact path="/private/:id" element={<Learnmore />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/single/:theid" element={<Single />}></Route>
            <Route element={<h1>Not found!</h1>}></Route>
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
