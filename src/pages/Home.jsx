import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import BookCard from "../components/BookCard";
import Banner from "../components/Banner";

export default function Home() {
  const newArrivals = {
    book1: {
      title: "The Midnight Library",
      author: "Matt Haig",
      image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
      price: "14.99",
      rating: 4,
    },
    book2: {
      title: "The Vanishing Half",
      author: "Brit Bennett",
      image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
      price: "14.99",
      rating: 4.5,
    },
    book3: {
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
      price: "14.99",
      rating: 3.2,
    },
    book4: {
      title: "The Sanatorium",
      author: "Sarah Pearse",
      image: "https://m.media-amazon.com/images/I/51k-rWw95NL.jpg",
      price: "14.99",
      rating: 4,
    },
    book5: {
      title: "The Push",
      author: "Ashley Audrain",
      image: "https://m.media-amazon.com/images/I/41ClAKnvFqL.jpg",
      price: "14.99",
      rating: 4.9,
    },
    book6: {
      title: "The Survivors",
      author: "Jane Harper",
      image: "https://m.media-amazon.com/images/I/51Q1qQ9YJTL.jpg",
      price: "14.99",
      rating: 4.5,
    },
  };

  return (
    <Box w={"100%"}>
      <Banner />
      <Flex
        gap={10}
        alignItems={"center"}
        justifyContent={"center"}
        w={"100%"}
        mt={10}
        flexWrap={"wrap"}
      >
        {Object.keys(newArrivals).map((item) => (
          <BookCard
            key={item}
            name={newArrivals[item].title}
            author={newArrivals[item].author}
            price={newArrivals[item].price}
            imageURL={newArrivals[item].image}
            rating={newArrivals[item].rating}
          />
        ))}
      </Flex>
    </Box>
  );
}
