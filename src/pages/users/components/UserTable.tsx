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
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import ConfirmButton from '../../../components/ConfirmButton';
import api from '../../../services/api';
  
    interface User {
        id: number;
        name: string;
        email: string;
    }

export function UserTable() {


    const [users, setUsers] = useState<User[]>([]);
    const toast = useToast()

    async function getUsers() {
    api.get('/users')
    .then((res) => {
        setUsers(res.data["data"]);
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
        api.delete(`/users/${id}`)
        .then((res) => {
          getUsers();
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
    getUsers();
  }, []);



    return (
        <Card backgroundColor='whiteAlpha.700' flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} padding='20px 20px'>
			<Flex px='25px' justify='space-between' mb='20px' align='center'>
				<Text color='gray.500' fontSize='22px' fontWeight='700' lineHeight='100%'>
					Usuários
				</Text>
                {/* <Spacer />
                <Button colorScheme='blue' size='sm'>
                    Novo
                </Button> */}
			</Flex>
            <TableContainer>
                <Table variant='simple' color='gray.500' mb='24px'>
                    <Thead>
                    <Tr>
                        <Th >#</Th>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th>Ações</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    { 
                    users.map((user) => (
                        <Tr key={user.id}>
                        <Td>{user.id}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                        <ConfirmButton
                            headerText="Deseja excluir esse item?"
                            bodyText="O item sera excluído permanentemente do sistema"
                            onSuccessAction={() => {
                                remove(user.id)
                            }}
                            buttonText="Excluir"
                            isDanger={true}
                        />

                    
                          
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