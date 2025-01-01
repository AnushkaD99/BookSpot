import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
} from '@chakra-ui/react';
import axios from 'axios';
import { LuBook, LuCalendar, LuGlobe, LuStar } from 'react-icons/lu';

export default function DetailPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const APIKEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  // Colors
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const accentColor = 'purple.500';

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${APIKEY}`
        );
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          <Skeleton height="400px" />
          <Skeleton height="400px" gridColumn={{ md: 'span 2' }} />
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
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
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
              src={imageLinks?.large || imageLinks?.thumbnail || ''}
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
                {authors?.join(', ')}
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
                    <Text>{averageRating}/5 ({ratingsCount} reviews)</Text>
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
              <Text fontWeight="bold" mb={2} align={'justify'}>
                Description:
              </Text>
              <Text
                color={textColor}
                align={'justify'}
                dangerouslySetInnerHTML={{ __html: description }}
                sx={{
                  'a': {
                    color: accentColor,
                    textDecoration: 'underline',
                  }
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
};