import { HomeContainer, LogList, Blocs, Bloc, BlocDetails } from './styles';
import { FaClock, FaUsers} from 'react-icons/fa';
import { defaultTheme } from '../../styles/themes/default';
import { Header } from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import api from '../../services/api';

interface Log {
  id: number;
  start: String;
  end: String;
  name: string| null;
  totalMinutes: number| undefined;
  totalHours: number| undefined;
  totalDays: number| undefined;
}

export function Home() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    async function listLogs() {
      await api.get('/logs/')
      .then((res) => {
        setLogs(res.data as Log[]);
      })
      .catch((e) => {
        console.log(e);
      });
    }

    async function getCountUsers() {
      await api.get('/users/count')
      .then((res) => {
        setTotalUsers(res.data["total"] as number);
      })
      .catch((e) => {
        console.log(e);
      });
    }

    getCountUsers();
    listLogs();
  }, []);

  function getTotal() {
    let totalHours = 0;
    let totalMinutes = 0;
    let totalDays = 0;


    logs.forEach((e) => {
      totalHours += e.totalHours || 0
      totalDays += e.totalDays || 0;
      totalMinutes += e.totalMinutes || 0;
    })

    return `${totalDays}d ${totalHours}h ${totalMinutes}m`
  }

    return (
      <>
        <Header />
     
        <HomeContainer>
        
          <h1>Dashboard</h1>
          <h5>Logs de inatividade</h5>

          <Blocs>
            <Bloc>
                <FaUsers color={defaultTheme['gray-400']} size={30} />
                <BlocDetails>
                  <span>Total usuários</span>
                  <h3>{totalUsers}</h3>
                </BlocDetails>
            
              </Bloc>
              <Bloc>
                <FaClock color={defaultTheme['gray-400']} size={30} />
                <BlocDetails>
                  <span>Total inatividade</span>
                  <h3>{ getTotal() }</h3>
                </BlocDetails>
            
              </Bloc>
          </Blocs>

          <LogList>
            <table>
              <thead>
                <tr>
                  <th>Usuário</th>
                  <th>Inicío</th>
                  <th>Fim</th>
                  <th>Tempo inativo</th>
                </tr>
              </thead>
              <tbody>
                { 
                  logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.name}</td>
                      <td>{log.start}</td>
                      <td>{log.end}</td>
                      <td>{log.totalDays}d {log.totalHours}h {log.totalMinutes}m</td>
                  </tr>
                  ))
                }
                
               
              </tbody>
            </table>
          </LogList>
        </HomeContainer>
      </>
    )
  }
  
  