import { Form, NewTypeContainer } from './styles';
import { Header } from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/Button';
import { Divider } from '../../components/Divider/Divider';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

interface TypeDevide {
  id: number;
  name: string;
}

export function NewType() {
  const [typeDevice, setTypeDevice] = useState<TypeDevide>({} as TypeDevide);

  let { id } = useParams(); 

  async function findTypeDevice() {
    api.get(`/types_device/${id}`)
    .then((res) => {
     console.log(res);
     setTypeDevice(res.data["data"]);
    })
    .catch((err) => {
     alert('Erro ao buscar tipo dispositivo, tente novamente!');
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
        alert('Item salvo com sucesso!');
      })
      .catch((err) => {
        console.log(err);
        const message = err.data["data"];

        if (message && message == "ALREADY_EXISTS")
          alert('Já existe um tipo dispositivo com esse nome!')
        else 
          alert('Ocorreu um erro ao salvar, tente novamente!');

        
      });
    } else {
      api.post(`/types_device/0`, valuesJson)
      .then((res) => {
        alert('Item salvo com sucesso!');
      })
      .catch((err) => {
        console.log(err);
        const message = err.data["data"];



        if (message && message == "ALREADY_EXISTS")
          alert('Já existe um tipo dispositivo com esse nome!')
        else 
          alert('Ocorreu um erro ao salvar, tente novamente!');

        
      });
    }
   }

  useEffect(() => {
    findTypeDevice();
  }, []);

    return (
      <>
        <Header />
     
        <NewTypeContainer>
        
          <h1>Novo tipo</h1>
          <h5></h5>

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
            <Form onSubmit={handleSubmit}>
              <Input
                label='Nome'
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && errors.name ? errors.name : null}
              />
           
        
              <Divider mt={20}/>
              <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                Salvar
              </Button>
            </Form>
           )}
         </Formik>


         
        </NewTypeContainer>
      </>
    )
  }
  
  