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

export default function SignUpPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  // Colors
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = 'purple.500';

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Add your registration logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast({
        title: 'Account created successfully!',
        description: 'Welcome to BookSpot.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error creating account',
        description: 'Please try again later.',
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
              Join BookSpot Today
            </Heading>
            <Text color={textColor}>
              Create an account to start your reading journey
            </Text>
          </VStack>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

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
                    placeholder="Create a password"
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

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      icon={showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                width="100%"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </VStack>
          </form>

          <VStack spacing={4}>
            <HStack w="100%">
              <Divider />
              <Text color={textColor} whiteSpace="nowrap" fontSize="sm">
                or sign up with
              </Text>
              <Divider />
            </HStack>

            {/* Social Sign Up Buttons */}
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

            {/* Sign In Link */}
            <Text color={textColor}>
              Already have an account?{' '}
              <Link
                as={RouterLink}
                to="/signin"
                color={accentColor}
                fontWeight="semibold"
              >
                Sign in
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}