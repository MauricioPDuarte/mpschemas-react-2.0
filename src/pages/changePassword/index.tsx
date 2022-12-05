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
    PinInput,
    PinInputField,
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
  
  
export function ChangePassword() {
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState('');
    const navigate = useNavigate();
    const toast = useToast()
  
    function handleChangePassword() {
      const data = JSON.stringify({new_password: password, code: code})

      api.post('/change_password', data, {
        headers: {
           'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        toast({
          title: 'Sucesso',
          description: "Senha alterada com sucesso, faça o login no sistema",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })

        navigate('/login')
      })
      .catch((err) => {
        toast({
          title: 'Erro',
          description: "Código inválido ou expirado!",
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
              Altere sua senha
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
              <FormLabel htmlFor="code">Código</FormLabel>
                <HStack>
                  <PinInput onChange={(v) => setCode(v)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Nova senha</FormLabel>
                <Input id="password" type="password"  onChange={(e) => setPassword(e.target.value)}/>
              </FormControl>
              
            </Stack>
           
            <Stack spacing="3" mt={4}>
              <Button variant="solid" background='blue.400' color='white' onClick={handleChangePassword}>Alterar senha</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>

  
  );
   
}