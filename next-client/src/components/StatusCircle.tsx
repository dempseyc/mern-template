

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';


const StatusCircle = (props) => {
    const {status} = props;
    const mapStatusIcon = {
        "false": <CircleOutlinedIcon/>,
        "error": <ErrorOutlineIcon/>,
        "valid": <CheckCircleIcon/>,
        "current": <CircleIcon/>
    }
    return (
        <>
        {mapStatusIcon[status]}
        </>
    )
}

export default StatusCircle