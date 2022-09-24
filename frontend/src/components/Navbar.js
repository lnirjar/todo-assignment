import { Button, Stack } from "@mui/material"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            p={2}
            sx={{
                backgroundColor: 'white'
            }}
        >
            <Stack
                component='nav'
                direction='row'
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
                width='100%'
                maxWidth='1000px'
            >
                <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                    <Button>Dashboard</Button>
                </Link>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                    <Button variant="outlined">Login</Button>
                </Link>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Register</Button>
                </Link>
            </Stack>
        </Stack>
    )
}

export default Navbar