import {useState} from 'react';
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import SearchIcon from '@mui/icons-material/Search';

const SearchForm = (props) => {
    const {submitQuery, resetQuery, setFilter} = props;

    const [text, setText] = useState('');
    
    const handleSubmit = (event) => {
        console.log("submit")
        event.preventDefault();
        submitQuery({text: text, page: 1});
    }

    return (
        <Card>
            <Box>
            <form className="search-form" onSubmit={handleSubmit}>
                <TextField
                    value={text}
                    onChange={(e) => {
                        const val = e.target.value;
                        setText(val);
                        setFilter(val);
                        if (val === '') { resetQuery(); }
                    }}
                    required
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={handleSubmit}>
                            <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
            </form>
            </Box>
        </Card>
    )

}

export default SearchForm




// render

