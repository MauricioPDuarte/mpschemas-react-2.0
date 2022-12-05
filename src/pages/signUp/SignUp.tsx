import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
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
import InputMask from "react-input-mask";
import { Formik, validateYupSchema } from 'formik';
import * as React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface User {
  email: string;
  name: string;
  phone: string;
  password: string;
  path: string;
  file: any;
}

export function SignUp() {
  const navigate = useNavigate();
  const [user, setUset] = React.useState<User>({} as User)
  const toast = useToast()

  function handleSignUp(values: User) {
    var bodyFormData = new FormData();
    bodyFormData.append('name', values.name);
    bodyFormData.append('phone', values.phone);
    bodyFormData.append('email', values.email);
    bodyFormData.append('password', values.password);
    bodyFormData.append('file', values.file);

    api.post(`/users/0`, bodyFormData, {
      headers: {
         'Content-Type': 'multipart/form-data',
      }
    })
    .then((res) => {
      toast({
        title: 'Sucesso',
        description: "Usuário cadastrado com sucesso, faça seu login!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      })

      navigate('/login');
    })
    .catch((err) => {
      const message = err.response.data["data"];

      if(message === "EMAIL_EXISTS") {
        toast({
          title: 'Erro',
          description: "Já existe um usuário com esse e-mail!",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })
      } else {
        toast({
          title: 'Erro',
          description: "Ocorreu um erro ao cadastrar o usuário!",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })
      }
    });
  }

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }


 return (
  
  <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
    <Stack spacing="8">
      <Stack spacing="6">
        <Text textAlign='center' fontSize={30} fontWeight={600} color='gray.600'>MPSchemas</Text>
        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
          <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
            Faça seu cadastro no MPSchemas
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Já possui uma conta?</Text>
            <Button variant="link" colorScheme="blue" onClick={() => navigate('/login')}>
              Faça o login
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




          <Formik
            initialValues={{...user}}
            enableReinitialize={true}
            validate={values => {
              const errors: User = {} as User;
              if (!values.name) {
                errors.name = 'Campo obrigatório';
              }
              if (!values.email) {
                errors.email = 'Campo obrigatório';
              }
              if (!values.password) {
                errors.password = 'Campo obrigatório';
              }
              if (!values.phone) {
                errors.phone = 'Campo obrigatório';
              }

              if (values.phone.length < 15) {
                errors.phone = 'Telefone inválido';
              }

              if(!isValidEmail(values.email)) {
                errors.email = 'E-mail inválido';
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await handleSignUp(values)
              setSubmitting(false);
            }}
          >
              {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              handleSubmit,
              isSubmitting,
            }) => (
            <form onSubmit={handleSubmit}>

            <FormControl isInvalid={errors.name != null}>
              <FormLabel>Nome</FormLabel>
              <Input
        
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  size='lg'
                />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email != null} mt={3}>
              <FormLabel>Email</FormLabel>
              <Input
        
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  size='lg'
                />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phone != null} mt={3}>
              <FormLabel>Celular</FormLabel>
              <Input
        
                  type="tel"
                  name="phone"
                  as={InputMask} mask="(**) *****-****" maskChar={null}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  size='lg'
                />
              <FormErrorMessage>{errors.phone}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password != null} mt={3}>
              <FormLabel>Senha</FormLabel>
              <Input
        
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  size='lg'
                />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.path != null} mt="10px">
              <FormLabel>Foto</FormLabel>
              
              <Input
                  type="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                  size='lg'
                /> 
              <Text fontSize={12}>{user.path}</Text>
              <FormErrorMessage>{errors.path}</FormErrorMessage>
           
            </FormControl>
                
            <Stack mt={5} direction='row' spacing={4} align='center' justifyContent='right'>
              <Button w='100%' variant="solid" background='blue.400' color='white' type="submit">Cadastrar-se</Button>
            </Stack>
          
              </form>
            )}
          </Formik>



           
          </Stack>

        </Stack>
      </Box>
    </Stack>
  </Container>


);
 
}