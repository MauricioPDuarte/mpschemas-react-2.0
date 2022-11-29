
import { AuthProvider } from './auth';


type Props = {
  children: JSX.Element,
};

function AppProvider(props: Props) {
  return (
    <AuthProvider>
      {props.children}
    </AuthProvider>
  );
}

export default AppProvider;