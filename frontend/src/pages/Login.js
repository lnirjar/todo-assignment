import { Button, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (prop) => () => {
        setValues({
            ...values,
            [prop]: !values[prop],
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            p={2}
        >
            <Typography variant='h3'>Login</Typography>
            <Stack
                component='form'
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                    maxWidth: '500px',
                    width: '100%',
                    margin: '20px'
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    id="email"
                    label="Email"
                    placeholder="john@example.com"
                    fullWidth
                    type='email'
                    value={values.email}
                    onChange={handleChange('email')}
                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={values.showPassword ? 'text' : 'password'}
                        placeholder="abc123"
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword('showPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button
                    fullWidth
                    type='submit'
                    size='large'
                    variant='contained'>
                    Submit
                </Button>
            </Stack>
        </Stack>
    )
}

export default Login