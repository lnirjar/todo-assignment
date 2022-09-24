import { Fab, Stack } from "@mui/material"
import TodoItem from "../components/TodoItem"
import AddIcon from '@mui/icons-material/Add';
import TodoFormDialog from "../components/TodoFormDialog";

function Dashboard() {
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
                    <TodoItem text='Learn JS' dueDate='24 sep 2022 10:00' />
                    <TodoItem text='Learn CSS' dueDate='8 oct 2022 13:10' />
                    <TodoItem text='Learn HTML' dueDate='24 nov 2022 18:30' />
                    <TodoItem text='Learn HTML' dueDate='24 nov 2021 18:30' />
                    <TodoItem text='Learn HTML' dueDate='24 nov 2023 18:30' />
                    <TodoItem text='Learn JS' dueDate='24 sep 2022 10:00' />
                    <TodoItem text='Learn CSS' dueDate='8 oct 2022 13:10' />
                    <TodoItem text='Learn HTML' dueDate='24 nov 2022 18:30' />
                    <TodoItem text='Learn HTML' dueDate='24 nov 2021 18:30' />
                    <TodoItem text='Learn HTML' dueDate='24 nov 2023 18:30' />
                </Stack>
                <TodoFormDialog actionType='create' />
            </Stack>
        </>
    )
}

export default Dashboard