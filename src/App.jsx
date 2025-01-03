import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Home, DetailPage, SignInPage, SignUpPage, MyBooks } from "./pages";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Flex direction={"column"} minH={"100vh"}>
        <NavBar />

        <Box flex="1" mb={10}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/book/:bookId" element={<DetailPage />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </Box>

        <Footer />
        <Routes>
        </Routes>
      </Flex>
    </Router>
  );
}

export default App;
