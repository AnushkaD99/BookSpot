import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Home } from "./pages";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Flex direction={"column"} minH={"100vh"}>
        <NavBar />

        <Box flex="1" mb={10}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </Box>

        <Footer />
      </Flex>
    </Router>
  );
}

export default App;
