import { Button, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/users/';

function Register({ auth, setAuth }) {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        showPassword: false,
        showPassword2: false,
        helperText: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (auth.user) {
            navigate('/dashboard')
        }
    }, [auth.user])

    const registerUser = async (userData) => {
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
        }
    }

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
        setValues((prevState) => ({
            ...prevState,
            helperText: ''
        }))
        if (values.password !== values.password2) {
            setValues((prevState) => ({
                ...prevState,
                helperText: 'password not matching'
            }))
        } else {
            const { name, email, password } = values;
            registerUser({ name, email, password });
            setValues({
                name: '',
                email: '',
                password: '',
                password2: '',
                showPassword: false,
                showPassword2: false,
                helperText: ''
            })
        }
    }

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            p={2}
        >
            <Typography variant='h3'>Register</Typography>
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
                onSubmit={(e) => { e.preventDefault() }}
            >
                <TextField
                    id="name"
                    label="Name"
                    fullWidth
                    value={values.name}
                    onChange={handleChange('name')}
                />
                <TextField
                    id="email"
                    label="Email"
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
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        id="confirm-password"
                        type={values.showPassword2 ? 'text' : 'password'}
                        value={values.password2}
                        onChange={handleChange('password2')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword('showPassword2')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                    />
                    <FormHelperText id="password2-helper-text">{values.helperText}</FormHelperText>
                </FormControl>
                <Button
                    fullWidth
                    type='submit'
                    size='large'
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Stack>
        </Stack>
    )
}

export default Register