import { Fab, Stack } from "@mui/material"
import TodoItem from "../components/TodoItem"
import AddIcon from '@mui/icons-material/Add';
import TodoFormDialog from "../components/TodoFormDialog";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ auth, setAuth }) {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.user) {
            navigate('/');
        }
    }, [auth.user])

    useEffect(() => {
        const fetchData = async () => {
            if (auth.user) {
                const API_URL = '/api/tasks';
                const token = auth && auth.user && auth.user.token;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                const response = await axios.get(API_URL, config);

                setTasks(response.data);
            } else {
                setTasks([]);
            }
        }

        fetchData();

    }, [])

    return (
        <>
            <Stack
                p={4}
                alignItems='center'
                marginLeft='auto'
                marginRight='auto'
                maxWidth='1000px'
                position='relative'
                paddingBottom='150px'
            >
                <Stack
                    spacing={2}
                    maxWidth='600px'
                    width='100%'
                >
                    {
                        tasks.map(task => (<TodoItem {...task} auth={auth} key={task._id} />))
                    }

                </Stack>
                <TodoFormDialog actionType='create' auth={auth} tasks={tasks} setTasks={setTasks} />
            </Stack>
        </>
    )
}

export default Dashboard