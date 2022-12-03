import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Divider } from "../../components/Divider/Divider";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import {  Bloc, Form, SignUpContainer } from "./styles";



interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}


export function SignUp() {
  const navigate = useNavigate();

  function handleSignUp(values: User) {
    const valuesJson = JSON.stringify(values);

    api.post(`/users/0`, valuesJson, {
      headers: {
         'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      alert('Usuário cadastrado com sucesso!');
      navigate('/login')
    })
    .catch((err) => {
      alert('Erro ao cadastrar usuário!');
      
    });
    
  }

  useEffect(() => { 
   
  }, []);

    return (
      <SignUpContainer>
        
      <Bloc>
               
        <h1>MPSchemas</h1>

        <Formik
          initialValues={{} as User}
          enableReinitialize={true}
          validate={values => {
            const errors: User = {} as User;
            if (!values.name) {
              errors.name = 'Campo obrigatório';
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

              <Input
                label='Email'
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email ? errors.email : null}
              />
          

             <Input
                label='Senha'
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && errors.password ? errors.password : null}
              />
          
          
        
              <Divider mt={20}/>
             
              
                <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                  CADASTRAR
                </Button>
       
      
            </Form>
          )}
         </Formik>



          </Bloc>
        
      </SignUpContainer>
    
    )
  }
  
  