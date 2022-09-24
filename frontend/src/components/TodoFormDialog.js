import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Fab, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';

const API_URL = '/api/tasks';

function TodoFormDialog(props) {
    const { actionType, auth, taskText, dueDate } = props;
    console.log(props);
    const [open, setOpen] = useState(false);

    const [text, setText] = useState(taskText || '');
    const [date, setDate] = useState(new Date(dueDate) || new Date(Date.now()));

    const handleClickOpen = () => {
        setOpen(true);
        setText(taskText || '');
        setDate(new Date(dueDate) || new Date(Date.now()));
    };

    const handleClose = () => {
        setOpen(false);
        setText('');
        setDate(new Date(Date.now()));
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const token = auth && auth.user && auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        if (actionType === 'create') {
            const response = await axios.post(API_URL, { text, dueDate: date }, config);
            props.setTasks(prevTasks => ([...prevTasks, response.data]))
        } else {
            const response = await axios.put(`${API_URL}/${props._id}`, { text, dueDate: date }, config);
            props.setTasks(prevTasks => (
                prevTasks.map(task => {
                    if (task._id == response.data._id) {
                        return response.data;
                    }
                    return task;
                })
            ))
        }

        handleClose();
    }

    return (
        <div style={{
            justifySelf: 'end'
        }}>
            {actionType === 'edit' && <Fab size="small" color="secondary" onClick={handleClickOpen} aria-label="edit">
                <EditIcon />
            </Fab>}
            {actionType === 'create' && <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    right: '10%',
                    bottom: '10%'
                }}
                onClick={handleClickOpen}
            >
                <AddIcon />
            </Fab>}
            <Dialog
                fullWidth
                open={open}
                onClose={handleClose}
            >
                {actionType === 'edit' && <DialogTitle>Edit Task</DialogTitle>}
                {actionType === 'create' && <DialogTitle>Create Task</DialogTitle>}

                <DialogContent>
                    <Stack spacing={4}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Task"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={text}
                            onChange={handleTextChange}
                        />

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDateTimePicker
                                label="Due Date"
                                value={date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField variant='standard' {...params} />}
                            />
                        </LocalizationProvider>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{
                    paddingLeft: '20px',
                    paddingRight: '25px',
                    paddingBottom: '30px',
                }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} variant='contained'>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TodoFormDialog