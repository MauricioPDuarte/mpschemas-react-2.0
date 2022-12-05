import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    InputGroup,
    Link,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useMergeRefs,
    useToast,
  } from '@chakra-ui/react'
  import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
  
  
export function ForgotPassword() {
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();
    const toast = useToast()
  
    function handleSendMail() {
      const data = JSON.stringify({email: email})

      api.post('/forgot_password', data, {
        headers: {
           'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        toast({
          title: 'Sucesso',
          description: "E-mail de recuperação de senha enviado com sucesso!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })

        navigate('/alterar_senha');
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description: "Erro ao recuperar senha!",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })
      });
    }



   return (
    
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Text textAlign='center' fontSize={30} fontWeight={600} color='gray.600'>MPSchemas</Text>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Recupere sua senha
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Ja recuperou sua senha?</Text>
              <Button variant="link" colorScheme="blue" onClick={() => navigate('/login')}>
                Faca o login
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="3">
              <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input id="email" type="email"  onChange={(e) => setEmail(e.target.value)}/>
              </FormControl>
              
            </Stack>
           
              <Link mt={0} textAlign='right' color='blue.400' onClick={() => navigate('/alterar_senha')} >Ja possui o código para redefinir a senha?</Link>
        
            <Stack spacing="3" mt={4}>
              <Button variant="solid" background='blue.400' color='white' onClick={handleSendMail}>Recuperar senha</Button>
              
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>

  
  );
   
}