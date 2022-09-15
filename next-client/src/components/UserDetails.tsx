import Button from '@mui/material/Button';

const UserDetails = (props) => {
    const details = {...props.user};
    const {logoutUser} = props;
   return (
      <div className="UserDetails">
         <span>
         {details.email}
         </span>
         <Button onClick={logoutUser}>Sign Out</Button>
      </div>

   );
}

export default UserDetails