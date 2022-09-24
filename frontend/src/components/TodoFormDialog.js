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

function TodoFormDialog({ actionType }) {
    const [open, setOpen] = useState(false);

    const [text, setText] = useState('');
    const [date, setDate] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

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
                    <Button onClick={handleClose} variant='contained'>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TodoFormDialog