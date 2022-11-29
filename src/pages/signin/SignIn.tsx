import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { SignInContainer, Bloc } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, user} = useAuth();
  const navigate = useNavigate();

  function handleSignIn() {
    signIn({ email, password});
  }

  useEffect(() => { 
    if(user) {
      navigate('/dashboard')
    }
  }, [user]);

    return (
      <SignInContainer>

          <Bloc>
            <h1>LogWorking</h1>

            <input placeholder="E-mail"  onChange={(e) => setEmail(e.target.value)}/> 
            <input placeholder="Senha" type='password' onChange={(e) => setPassword(e.target.value)} /> 

            <button onClick={handleSignIn}>ENTRAR</button>
          </Bloc>
        
      </SignInContainer>
    
    )
  }
  
  