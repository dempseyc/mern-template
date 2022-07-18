import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const LoginChoices = (props) => {
    const setMode = props.setMode;
    const buttons = [
        <Button 
            key="login-choice-email"
            onClick={()=>setMode('email')}
            >Login with email/username</Button>,
        <Button 
            key="login-choice-create"
            onClick={()=>setMode('create')}
            >Create New User</Button>,
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
