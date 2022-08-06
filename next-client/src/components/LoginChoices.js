import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const LoginChoices = (props) => {
    const {setMode, authFB, authLogoutFB} = props;
    const buttons = [
        <Button 
            key="login-choice-email"
            onClick={()=>setMode('email')}
            >Sign in with email</Button>,
        <Button 
            key="login-choice-create"
            onClick={()=>setMode('create')}
            >New user with email</Button>,
          <Button 
            key="login-choice-fb"
            onClick={authFB}
            >Sign in with Facebook</Button>,
            <Button 
            key="logout-choice-fb"
            onClick={authLogoutFB}
            >Log out Facebook</Button>,
      ];
  return (
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {buttons}
      </ButtonGroup>
  );
}

export default LoginChoices
