import { TypesContainer, TypesList } from './styles';
import { Header } from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../../components/Divider/Divider';


interface TypesDevive {
  id: number;
  name: string;
}

export function Types() {
  const [types, setTypes] = useState<TypesDevive[]>([]);

  const navigate = useNavigate();

  async function remove(id: number) {
      api.delete(`/types_device/${id}`)
      .then((res) => {
        getTypesDevices();
        alert('Item excluído com sucesso!');
      })
      .catch((err) => {
        alert('Erro ao excluir tipo de dispositivo, tente novamente!');
      });
  } 

  async function getTypesDevices() {
    api.get('/types_device')
    .then((res) => {
     
      setTypes(res.data["data"]);
    })
    .catch((err) => {alert('Erro ao listar tipos de dispositivos, tente novamente!'); console.log(err)})
  }


  useEffect(() => {
    getTypesDevices();
  }, []);




    return (
      <>
        <Header />
        <TypesContainer>
        
          <h1>Tipos dispositivos</h1>

          <TypesList>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Ações</th>
                
                </tr>
              </thead>
              <tbody>
                { 
                  types.map((type) => (
                    <tr key={type.id}>
                      <td>{type.id}</td>
                      <td>{type.name}</td>
                      <td>
                        <Button onClick={() => remove(type.id)}>Excluir</Button>
                        <Button onClick={() => navigate(`/novo_tipo_dispositivo/${type.id}`)}>Editar</Button>
                      </td>
               
                  </tr>
                  ))
                }
              </tbody>
            </table>
          </TypesList>
        </TypesContainer>
      </>
    )
  }
  
  