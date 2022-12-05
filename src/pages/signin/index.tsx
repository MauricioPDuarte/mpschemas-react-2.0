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
  } from '@chakra-ui/react'
  import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
  
  
export function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {signIn, user} = useAuth();
    const navigate = useNavigate();
  
    function handleSignIn() {
      signIn({ email, password});
    }

    React.useEffect(() => { 
        if(user) {
          navigate('/esquemas')
        }
      }, [user]);

   return (
    
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Text textAlign='center' fontSize={30} fontWeight={600} color='gray.600'>MPSchemas</Text>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
              Faça login na sua conta no mpschemas
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Ainda não possui uma conta?</Text>
              <Button variant="link" colorScheme="blue" onClick={() => navigate('/cadastro')}>
                Cadastre-se
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
              <FormControl>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <InputGroup>
                <Input
                    id="password"
                    name="password"
                    type='password'
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                </InputGroup>
            </FormControl>
            </Stack>
           
              <Link mt={0} textAlign='right' color='blue.400' onClick={() => navigate('/recuperar_senha')} >Esqueceu sua senha?</Link>
        
            <Stack spacing="3" mt={4}>
              <Button variant="solid" background='blue.400' color='white' onClick={handleSignIn}>Entrar</Button>
              
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>

  
  );
   
}