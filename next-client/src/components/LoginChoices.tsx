import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const LoginChoices = (props) => {
    const { setMode } = props;
    const buttons = [
        <Button 
            key="login-choice-email"
            onClick={ () => setMode('email') }
            >Sign in with email</Button>,
        <Button 
            key="login-choice-create"
            onClick={ () => setMode('create') }
            >New user with email</Button>,
      ];
  return (
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        { buttons }
      </ButtonGroup>
  );
}

export default LoginChoices
