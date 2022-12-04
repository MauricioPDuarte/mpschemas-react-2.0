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
    Spacer,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmButton from '../../../components/ConfirmButton';
import api from '../../../services/api';
  
interface TypesDevive {
    id: number;
    name: string;
  }
  

export function TypesList() {


    const [types, setTypes] = useState<TypesDevive[]>([]);
    const toast = useToast()

    async function getTypesDevices() {
    api.get('/types_device')
    .then((res) => {
        setTypes(res.data["data"]);
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
        api.delete(`/types_device/${id}`)
        .then((res) => {
            getTypesDevices();
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
    getTypesDevices();
  }, []);


  const navigate = useNavigate();

    return (
        <Card backgroundColor='whiteAlpha.700' flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }} padding='20px 20px'>
			<Flex px='25px' justify='space-between' mb='20px' align='center'>
				<Text color='gray.500' fontSize='22px' fontWeight='700' lineHeight='100%'>
					Tipos dispositivos
				</Text>
                <Spacer />
                <Button colorScheme='blue' size='sm'  onClick={() =>  navigate(`/novo_tipo_dispositivo/`)}>
                    Novo
                </Button> 
			</Flex>
            <TableContainer>
                <Table variant='simple' color='gray.500' mb='24px'>
                    <Thead>
                    <Tr>
                        <Th >#</Th>
                        <Th>Nome</Th>
                        <Th>Ações</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    { 
                    types.map((type) => (
                        <Tr key={type.id}>
                        <Td>{type.id}</Td>
                        <Td>{type.name}</Td>
                        <Td>
                        <ConfirmButton
                            headerText="Deseja excluir esse item?"
                            bodyText="O item sera excluído permanentemente do sistema"
                            onSuccessAction={() => {
                                remove(type.id)
                            }}
                            buttonText="Excluir"
                            isDanger={true}
                        />
                            <Button ml='5px' colorScheme='blue' size='xs' onClick={() => navigate(`/novo_tipo_dispositivo/${type.id}`)}>
                                Editar
                            </Button>                  
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