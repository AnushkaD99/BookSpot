import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Card,
  CardBody,
  Image,
  Stack,
  Button,
  useToast,
  Center,
  Spinner,
  useColorModeValue,
  VStack,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { LuTrash2, LuBookOpen } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // Colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    fetchUserBooks();
  }, [user]);

  const fetchUserBooks = async () => {
    try {
      const q = query(
        collection(db, 'savedBooks'),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(q);
      const userBooks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setBooks(userBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast({
        title: 'Error fetching books',
        description: 'Unable to load your books. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBook = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'savedBooks', bookId));
      setBooks(books.filter(book => book.id !== bookId));
      
      toast({
        title: 'Book removed',
        description: 'The book has been removed from your collection.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error removing book:', error);
      toast({
        title: 'Error',
        description: 'Unable to remove the book. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Center h="calc(100vh - 64px)">
        <Spinner size="xl" color="purple.500" />
      </Center>
    );
  }

  return (
    <Box minH="calc(100vh - 64px)" bg={useColorModeValue('gray.50', 'gray.900')} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading size="xl" mb={2}>My Books</Heading>
            <Text color={textColor}>Your personal reading collection</Text>
          </Box>

          {books.length === 0 ? (
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardBody>
                <Center p={8}>
                  <VStack spacing={4}>
                    <LuBookOpen size={48} />
                    <Text fontSize="lg">Your book collection is empty</Text>
                    <Text color={textColor} textAlign="center">
                      Start adding books to your collection to see them here
                    </Text>
                    <Button
                      colorScheme="purple"
                      onClick={() => window.location.href = '/'}
                    >
                      Browse Books
                    </Button>
                  </VStack>
                </Center>
              </CardBody>
            </Card>
          ) : (
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)'
              }}
              gap={6}
            >
              {books.map((book) => (
                <Card
                  key={book.id}
                  bg={cardBg}
                  borderWidth="1px"
                  borderColor={borderColor}
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                >
                  <CardBody>
                    <Image
                      src={book.coverImage || '/book-placeholder.png'}
                      alt={book.title}
                      borderRadius="lg"
                      w="full"
                      h="250px"
                      objectFit="cover"
                      mb={4}
                    />
                    <Stack spacing={3}>
                      <Heading size="md" noOfLines={2}>
                        {book.title}
                      </Heading>
                      <Text color={textColor} fontSize="sm">
                        by {book.author}
                      </Text>
                      <HStack justify="space-between" pt={2}>
                        <Button
                          variant="outline"
                          colorScheme="purple"
                          size="sm"
                          leftIcon={<LuBookOpen size={16} />}
                          onClick={() => navigate(`/book/${book.bookId}`)}
                        >
                          More Details
                        </Button>
                        <IconButton
                          icon={<LuTrash2 size={16} />}
                          colorScheme="red"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveBook(book.id)}
                          aria-label="Remove book"
                        />
                      </HStack>
                    </Stack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}