import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    TableContainer,
    Card,
    Flex,
    Button,
    useToast,
    Link,
    Spacer,
  } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import {  useNavigate } from 'react-router-dom';
import ConfirmButton from '../../../components/ConfirmButton';
import api from '../../../services/api';
  
interface Schema {
    id: number;
    user: {
        id: number;
        name: string;
    }
    type_device: {
        id: number;
        name: string;
    }
    brand: {
        id: number;
        name: string;
    }
    model: {
        id: number;
        name: string;
    },
    path: string;
  }
  

export function SchemasList() {
    const [schemas, setSchemas] = useState<Schema[]>([]);
    const toast = useToast()

    async function getSchemas() {
    api.get('/schemas')
    .then((res) => {
        setSchemas(res.data["data"]);
    })
    .catch((err) => {
        toast({
            title: 'Erro',
            description: "Erro ao listar os itens!",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top-right'
          });
        })
    }

    async function remove(id: number) {
        api.delete(`/schema/${id}`)
        .then((res) => {
            getSchemas();
          toast({
            title: 'Sucesso',
            description: "Item excluído com sucesso!",
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top-right'
          })
        })
        .catch((err) => {
            toast({
                title: 'Erro',
                description: "Erro ao excluír item!",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
              })
        });
    } 

    
  useEffect(() => {
    getSchemas();
  }, []);


  const navigate = useNavigate();

    return (
        <Card backgroundColor='whiteAlpha.700' flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} padding='20px 20px'>
			<Flex px='25px' justify='space-between' mb='20px' align='center'>
				<Text color='gray.500' fontSize='22px' fontWeight='700' lineHeight='100%'>
					Esquemas
				</Text>
                <Spacer />
                <Button colorScheme='blue' size='sm'  onClick={() =>  navigate(`/novo_esquema/`)}>
                    Novo
                </Button> 
			</Flex>
            <TableContainer>
                <Table variant='simple' color='gray.500' mb='24px'>
                    <Thead>
                    <Tr>
                        <Th >#</Th>
                        <Th>Tipo</Th>
                        <Th>Marca</Th>
                        <Th>Modelo</Th>
                        <Th>Usuário</Th>
                        <Th>Ações</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    { 
                    schemas.map((schema) => (
                        <Tr key={schema.id}>
                            <Td>{schema.id}</Td>
                            <Td>{schema.type_device.name}</Td>
                            <Td>{schema.brand.name}</Td>
                            <Td>{schema.model.name}</Td>
                            <Td>{schema.user.name}</Td>
                            <Td>
                            <ConfirmButton
                                headerText="Deseja excluir esse item?"
                                bodyText="O item sera excluído permanentemente do sistema"
                                onSuccessAction={() => {
                                    remove(schema.id)
                                }}
                                buttonText="Excluir"
                                isDanger={true}
                            />
                                <Button ml='5px' colorScheme='blue' size='xs' onClick={() => navigate(`/novo_esquema/${schema.id}`)}>
                                    Editar
                                </Button> 
                                <a href={'http://127.0.0.1:5000/files/' + schema.path}>
                                    <Button colorScheme="blue" size='xs'  ml='5px'>
                                        <FiDownload />
                                    </Button>  
                                </a>
                             
                            </Td>
                     </Tr>
                    ))
                    }
            
                    </Tbody>
                
                </Table>
            </TableContainer>
        </Card>
    )
}