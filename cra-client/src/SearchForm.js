import {useState} from 'react';
// import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

const SearchForm = (props) => {
    const {submitQuery} = props;

    const [text, setText] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        submitQuery({query: text, page: 1});
    }

    return (
        <form className="chat-form" onSubmit={handleSubmit}>
            <TextField
                label="With normal TextField"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                required
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="start">
                        <IconButton>
                        <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
            <input type="submit" value='>'/>
        </form>
    )

}

export default SearchForm




// render

