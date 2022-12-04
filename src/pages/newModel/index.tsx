import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { Button, Card, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Stack, useToast } from '@chakra-ui/react';

interface Model {
  id: number;
  name: string;
  brand_id: number;
}

interface Brand {
  id: number;
  name: string;
}

interface ModelError {
  name: string;
  brand_id: string;
}


export function NewModel() {
  const [model, setModel] = useState<Model>({} as Model);
  const [brands, setBrands] = useState<Brand[]>([]);
  const navigate = useNavigate();
  const toast = useToast()

  let { id } = useParams(); 

  async function getBrands() {
    api.get('/brands')
    .then((res) => {
      setBrands(res.data["data"]);
    })
    .catch((err) => {
      toast({
        title: 'Erro',
        description: "Erro ao listar marcas!",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      })
    })
  }

  async function find() {
    api.get(`/model/${id}`)
    .then((res) => {
     console.log(res);
     setModel(res.data["data"]);
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

   async function submit(values: Model) {
    console.log("AQUIIII")

    const valuesJson = JSON.stringify(values);

    console.log(valuesJson);

    if(values.id) {
      api.put(`/model/${id}`, valuesJson, {
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
      api.post(`/model/0`, valuesJson, {
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
    getBrands();

    if(id != null)
      find();

     
  }, []);

    return (
      <Container maxW={1440}>


        <Card padding={10} backgroundColor='white'>
          
       
          <Formik
            initialValues={{...model}}
            enableReinitialize={true}
            validate={values => {
              console.log(values);
              const errors = {} as ModelError;
              if (!values.name) {
                errors.name = 'Campo obrigatório';
              }

              if(!values.brand_id) {
                errors.brand_id = 'Campo obrigatório';
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

            <FormControl isInvalid={errors.brand_id != null} mt="10px">
              <FormLabel>Marca</FormLabel>
              <Select name="brand_id" placeholder='Selecione...' size='lg' value={values.brand_id} onChange={handleChange}>
                <option value="" label="Selecione">
                  Select a color{" "}
                </option>
                { brands.map((item) => (
                   <option key={item.id} value={item.id}>{item.name}</option>
                )) }
              </Select>
                
             
              <FormErrorMessage>{errors.brand_id}</FormErrorMessage>
            </FormControl>

      
            <Stack mt={5} direction='row' spacing={4} align='center' justifyContent='right'>
              <Button
                colorScheme='blue'
                variant='outline'
                spinnerPlacement='end'
                onClick={() => navigate('/modelos')}
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
  
  