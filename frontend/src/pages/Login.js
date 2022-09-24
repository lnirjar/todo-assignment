import { Button, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/users/login';

function Login({ auth, setAuth }) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
        helperText: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            navigate('/dashboard')
        }
    }, [auth.user])

    const loginUser = async (userData) => {
        setAuth({
            user: null,
            isError: false,
            isSuccess: false,
            isLoading: true,
            message: ''
        });

        try {
            const response = await axios.post(API_URL, userData);

            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            setAuth({
                user: response.data,
                isError: false,
                isSuccess: true,
                isLoading: false,
                message: ''
            })
        } catch (error) {
            setAuth({
                user: null,
                isError: true,
                isSuccess: false,
                isLoading: false,
                message: error.message
            })
            setValues((prevState) => ({
                ...prevState,
                helperText: error.message
            }))
        }
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value, helperText: '' });
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
        const { email, password } = values;
        loginUser({ email, password });
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
                    <FormHelperText>{values.helperText}</FormHelperText>
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