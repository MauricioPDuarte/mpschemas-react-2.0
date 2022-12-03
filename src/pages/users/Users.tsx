import { UsersContainer, UsersList, HeaderTable } from './styles';
import { Header } from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../../components/Divider/Divider';
import { FaEdit, FaTrash } from 'react-icons/fa';


interface User {
  id: number;
  name: string;
  email: string;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  async function remove(id: number) {
      api.delete(`/users/${id}`)
      .then((res) => {
        getUsers();
        alert('Item excluído com sucesso!');
      })
      .catch((err) => {
        alert('Erro ao excluir usuário, tente novamente!');
      });
  } 

  async function getUsers() {
    api.get('/users')
    .then((res) => {
     
      setUsers(res.data["data"]);
    })
    .catch((err) => {alert('Erro ao listar usuários, tente novamente!'); console.log(err)})
  }


  useEffect(() => {
    getUsers();
  }, []);

    return (
      <>
        <Header />
        <UsersContainer>


          <HeaderTable>
            <h1>Usuários</h1>
          </HeaderTable>
 

          <UsersList>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                
                </tr>
              </thead>
              <tbody>
                { 
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button onClick={() => remove(user.id)}><FaTrash /></Button>
                      </td>
               
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </UsersList>
        </UsersContainer>
      </>
    )
  }
  
  