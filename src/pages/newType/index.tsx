import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { Button, Card, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';

interface TypeDevide {
  id: number;
  name: string;
}

export function NewType() {
  const [typeDevice, setTypeDevice] = useState<TypeDevide>({} as TypeDevide);
  const navigate = useNavigate();
  const toast = useToast()

  let { id } = useParams(); 

  async function findTypeDevice() {
    

    api.get(`/types_device/${id}`)
    .then((res) => {
     console.log(res);
     setTypeDevice(res.data["data"]);
    })
    .catch((err) => {
      toast({
        title: 'Erro',
        description: "Erro ao buscar item!",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      })
    })
   }

   async function submit(values: TypeDevide) {
    const valuesJson = JSON.stringify(values);



    if(values.id) {
      api.put(`/types_device/${id}`, valuesJson, {
        headers: {
           'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        toast({
          title: 'Sucesso',
          description: "Item salvo com sucesso!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })
      })
      .catch((err) => {
        const message = err.response.data["data"];

        if (message && message == "ALREADY_EXISTS")
        toast({
          title: 'Erro',
          description: "Já existe um item com esse nome!",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })
        else 
          toast({
            title: 'Erro',
            description: "Ocorreu um erro ao salvar o item!",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top-right'
          })

        
      });
    } else {
      api.post(`/types_device/0`, valuesJson, {
        headers: {
           'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        toast({
          title: 'Sucesso',
          description: "Item salvo com sucesso!",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right'
        })
      })
      .catch((err) => {
        console.log(err);
        const message = err.response.data["data"];



        if (message && message == "ALREADY_EXISTS")
          toast({
            title: 'Erro',
            description: "Já existe um item com esse nome!",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top-right'
          })
        else 
          toast({
            title: 'Erro',
            description: "Ocorreu um erro ao salvar o item!",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top-right'
          })


        
      });
    }
   }

  useEffect(() => {
    if(id != null)
      findTypeDevice();
  }, []);

    return (
      <Container maxW={1440}>


        <Card padding={10} backgroundColor='white'>
          
       
          <Formik
            initialValues={{...typeDevice}}
            enableReinitialize={true}
            validate={values => {
              const errors: TypeDevide = {} as TypeDevide;
              if (!values.name) {
                errors.name = 'Campo obrigatório';
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await submit(values)
              setSubmitting(false);
            }}
          >
              {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
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
                
            <Stack mt={5} direction='row' spacing={4} align='center' justifyContent='right'>
              <Button
                colorScheme='blue'
                variant='outline'
                spinnerPlacement='end'
                onClick={() => navigate('/tipos_dispositivos')}
              >
                Voltar
              </Button>

              <Button
                isLoading={isSubmitting}
                type="submit"
                loadingText='Loading'
                colorScheme='blue'
                variant='solid'
                disabled={isSubmitting}
                spinnerPlacement='start'
              >
                Salvar
              </Button>
            </Stack>
          
              </form>
            )}
          </Formik>

         </Card>

         
     
      </Container>
    )
  }
  
  