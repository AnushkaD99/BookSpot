import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";

export default function SearchBar() {
  const APIKEY = "AIzaSyDsGl2P7AcOC6wEjxx4sB9CZgsL1DFBz_g";
  const [search, setSearch] = useState("");
  const searchBook = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=" +
            APIKEY
        )
        .then((res) => console.log(res));
    }
  };
  return (
    <InputGroup>
      <Input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter your book name"
        onKeyDown={searchBook}
      />
      <InputRightElement>
        <LuSearch />
      </InputRightElement>
    </InputGroup>
  );
}
