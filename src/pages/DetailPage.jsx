import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Stack,
  Badge,
  Skeleton,
  Button,
  Divider,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { LuBook, LuCalendar, LuGlobe, LuStar } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function DetailPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookSaved, setIsBookSaved] = useState(false);
  const APIKEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // Colors
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const accentColor = "purple.500";

  const saveBook = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in to add books!",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/signin");
      return;
    }

    try {
      const bookToSave = {
        userId: user?.uid,
        bookId: bookId,
        title: title,
        author: authors?.join(", "),
        coverImage: imageLinks?.thumbnail || "",
        addedAt: new Date().toISOString(),
      };
  
      await addDoc(collection(db, "savedBooks"), bookToSave);
      toast({
        title: "Book successfully added to My Books!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${APIKEY}`
      );
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfBookSaved = async () => {
    if (isAuthenticated) {
      const q = query(
        collection(db, "savedBooks"),
        where("userId", "==", user?.uid),
        where("bookId", "==", bookId)
      );
      const querySnapshot = await getDocs(q);
      setIsBookSaved(!querySnapshot.empty);
    }
  };

  useEffect(() => {
    fetchBookDetails();
    checkIfBookSaved();
  }, [bookId,user, isAuthenticated]);

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
          <Skeleton height="400px" />
          <Skeleton height="400px" gridColumn={{ md: "span 2" }} />
        </Grid>
      </Container>
    );
  }

  const {
    volumeInfo: {
      title,
      authors,
      description,
      publisher,
      publishedDate,
      pageCount,
      categories,
      averageRating,
      ratingsCount,
      imageLinks,
      language,
      previewLink,
    } = {},
  } = book || {};

  return (
    <Container maxW="container.xl" py={8}>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={8}
        bg={bgColor}
        p={8}
        borderRadius="lg"
        boxShadow="base"
      >
        {/* Left Column - Image */}
        <GridItem>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <Image
              src={imageLinks?.large || imageLinks?.thumbnail || ""}
              alt={title}
              borderRadius="md"
              boxShadow="lg"
              maxH="400px"
              mb={6}
            />
            <Stack spacing={4} width="100%">
              <Button
                as="a"
                href={previewLink}
                target="_blank"
                colorScheme="purple"
                size="lg"
              >
                Preview Book
              </Button>
              <Button
                target="_blank"
                colorScheme="purple"
                size="lg"
                isDisabled={isBookSaved}
                onClick={saveBook}
              >
                {isBookSaved ? "Already Added" : "Add to My Books"}
              </Button>
            </Stack>
          </Box>
        </GridItem>

        {/* Right Column - Details */}
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Stack spacing={6}>
            <Box>
              <Heading as="h1" size="xl" mb={2}>
                {title}
              </Heading>
              <Text fontSize="xl" color={accentColor}>
                {authors?.join(", ")}
              </Text>
            </Box>

            {/* Quick Info */}
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box>
                <Stack direction="row" align="center" color={textColor}>
                  <LuCalendar size={20} />
                  <Text>{publishedDate}</Text>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" align="center" color={textColor}>
                  <LuBook size={20} />
                  <Text>{pageCount} pages</Text>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row" align="center" color={textColor}>
                  <LuGlobe size={20} />
                  <Text>Language: {language?.toUpperCase()}</Text>
                </Stack>
              </Box>
              {averageRating && (
                <Box>
                  <Stack direction="row" align="center" color={textColor}>
                    <LuStar size={20} />
                    <Text>
                      {averageRating}/5 ({ratingsCount} reviews)
                    </Text>
                  </Stack>
                </Box>
              )}
            </Grid>

            <Divider />

            {/* Categories */}
            {categories && (
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Categories:
                </Text>
                <Stack direction="row" flexWrap="wrap" gap={2}>
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      colorScheme="purple"
                      fontSize="sm"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {category}
                    </Badge>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Description */}
            <Box>
              <Text fontWeight="bold" mb={2} align={"justify"}>
                Description:
              </Text>
              <Text
                color={textColor}
                align={"justify"}
                dangerouslySetInnerHTML={{ __html: description }}
                sx={{
                  a: {
                    color: accentColor,
                    textDecoration: "underline",
                  },
                }}
              />
            </Box>

            {/* Additional Info */}
            <Box>
              <Text fontWeight="bold" mb={2}>
                Publication Details:
              </Text>
              <Text color={textColor}>
                Published by {publisher} • {publishedDate}
              </Text>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Container>
  );
}
