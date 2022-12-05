import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { Button, Card, Container, FormControl, FormErrorMessage, FormHelperText, Text, FormLabel, Input, Select, Stack, useToast } from '@chakra-ui/react';
import { MyDropzone } from '../../components/Dropzone';

interface Schema {
  id: number;
  brand_id: number;
  model_id: number;
  user_id: number;
  type_device_id: number;
  path: string;
  file: any;
}

interface Brand {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
}

interface TypeDevice {
  id: number;
  name: string;
}

interface SchemaError {
  name: string;
  brand_id: string;
  model_id: string;
  type_device_id: string;
}


export function NewSchema() {
  const [schema, setSchema] = useState<Schema>({} as Schema);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [typesDevices, setTypesDevices] = useState<TypeDevice[]>([]);

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

  async function getModels() {
    api.get('/models')
    .then((res) => {
      setModels(res.data["data"]);
    })
    .catch((err) => {
      toast({
        title: 'Erro',
        description: "Erro ao listar modelos!",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      })
    })
  }

  async function getTypeDevices() {
    api.get('/types_device')
    .then((res) => {
      setTypesDevices(res.data["data"]);
    })
    .catch((err) => {
      toast({
        title: 'Erro',
        description: "Erro ao listar tipos dispositivos!",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      })
    })
  }

  async function find() {
    api.get(`/schema/${id}`)
    .then((res) => {
     console.log(res);
     setSchema(res.data["data"]);
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

   async function submit(values: Schema) {

    console.log(values);

    var bodyFormData = new FormData();
    bodyFormData.append('user_id','1'); // ARRUMAR AQUI
    bodyFormData.append('brand_id', values.brand_id.toString());
    bodyFormData.append('model_id', values.model_id.toString());
    bodyFormData.append('type_device_id', values.type_device_id.toString());
    bodyFormData.append('file', values.file);

    if(values.id) {
      api.put(`/schema/${id}`, bodyFormData, {
        headers: {
           'Content-Type': 'multipart/form-data',
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
    } else {
      api.post(`/schema/0`, bodyFormData, {
        headers: {
           'Content-Type': 'multipart/form-data',
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

    getModels();
    getTypeDevices();
    getBrands();

    if(id != null)
      find();
  }, []);

    return (
      <Container maxW={1440}>


        <Card padding={10} backgroundColor='white'>
          
       
          <Formik
            initialValues={{...schema}}
            enableReinitialize={true}
            validate={values => {
              console.log(values);
              const errors = {} as SchemaError;
              if (!values.brand_id) {
                errors.brand_id = 'Campo obrigatório';
              }

              if(!values.model_id) {
                errors.model_id = 'Campo obrigatório';
              }

              if(!values.type_device_id) {
                errors.type_device_id = 'Campo obrigatório';
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
              setFieldValue,
              isSubmitting,
            }) => (
            <form onSubmit={handleSubmit}>
            
            
            <FormControl isInvalid={errors.type_device_id != null} mt="10px">
              <FormLabel>Tipo dispositivo</FormLabel>
              <Select name="type_device_id" placeholder='Selecione...' size='lg' value={values.type_device_id} onChange={handleChange}>
                { typesDevices.map((item) => (
                   <option key={item.id} value={item.id}>{item.name}</option>
                )) }
              </Select>
                
             
              <FormErrorMessage>{errors.type_device_id}</FormErrorMessage>
            </FormControl>
            

            <FormControl isInvalid={errors.brand_id != null} mt="10px">
              <FormLabel>Marca</FormLabel>
              <Select name="brand_id" placeholder='Selecione...' size='lg' value={values.brand_id} onChange={handleChange}>
                { brands.map((item) => (
                   <option key={item.id} value={item.id}>{item.name}</option>
                )) }
              </Select>
                
             
              <FormErrorMessage>{errors.brand_id}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.model_id != null} mt="10px">
              <FormLabel>Modelo</FormLabel>
              <Select name="model_id" placeholder='Selecione...' size='lg' value={values.model_id} onChange={handleChange}>
              
                { models.map((item) => (
                   <option key={item.id} value={item.id}>{item.name}</option>
                )) }
              </Select>
                
             
              <FormErrorMessage>{errors.model_id}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.path != null} mt="10px">
              <FormLabel>Esquema</FormLabel>
              
              <Input
                  type="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                  size='lg'
                /> 
              <Text fontSize={12}>{schema.path}</Text>
              <FormErrorMessage>{errors.path}</FormErrorMessage>
           
            </FormControl>


      
            <Stack mt={5} direction='row' spacing={4} align='center' justifyContent='right'>
              <Button
                colorScheme='blue'
                variant='outline'
                spinnerPlacement='end'
                onClick={() => navigate('/esquemas')}
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
  
  