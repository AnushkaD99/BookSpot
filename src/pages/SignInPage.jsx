// SignInPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack,
  useColorModeValue,
  Link,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

export default function SignInPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = 'purple.500';

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Add your authentication logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast({
        title: 'Sign in successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error signing in',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg={bgColor} minH="calc(100vh - 64px)" py={12}>
      <Container maxW="container.sm">
        <VStack
          spacing={8}
          bg={cardBg}
          p={{ base: 6, md: 12 }}
          borderRadius="lg"
          boxShadow="lg"
          align="stretch"
        >
          {/* Header */}
          <VStack spacing={2} align="center">
            <Heading
              fontSize="3xl"
              fontFamily="'Playfair Display', serif"
            >
              Welcome Back to BookSpot
            </Heading>
            <Text color={textColor}>
              Sign in to access your reading universe
            </Text>
          </VStack>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Box w="100%" textAlign="right">
                <Link
                  as={RouterLink}
                  to="/forgot-password"
                  color={accentColor}
                  fontSize="sm"
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                width="100%"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <VStack spacing={4}>
            <HStack w="100%">
              <Divider />
              <Text color={textColor} whiteSpace="nowrap" fontSize="sm">
                or continue with
              </Text>
              <Divider />
            </HStack>

            {/* Social Sign In Buttons */}
            <HStack spacing={4} width="100%">
              <Button
                w="full"
                variant="outline"
                leftIcon={<Box as="span" fontSize="1.5em">G</Box>}
              >
                Google
              </Button>
              <Button
                w="full"
                variant="outline"
                leftIcon={<Box as="span" fontSize="1.5em">f</Box>}
              >
                Facebook
              </Button>
            </HStack>

            {/* Sign Up Link */}
            <Text color={textColor}>
              Don't have an account?{' '}
              <Link
                as={RouterLink}
                to="/signup"
                color={accentColor}
                fontWeight="semibold"
              >
                Sign up
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};