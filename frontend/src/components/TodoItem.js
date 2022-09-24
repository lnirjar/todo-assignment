import { Checkbox, Chip, Fab, FormControlLabel, Paper, Stack } from "@mui/material"
import { useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import TodoFormDialog from "./TodoFormDialog";

function TodoItem({ text, dueDate }) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const formatDueDate = (dueDate) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const dateNow = new Date(Date.now());

        const date = new Date(dueDate);
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        if (dateNow > date) {
            return 'overdue';
        }

        if (year != new Date(Date.now()).getFullYear()) {
            return `${month.slice(0, 3)} ${year}`;
        }

        if (date.toLocaleDateString('en-IN') == dateNow.toLocaleDateString('en-IN')) {
            const timeString = date.toLocaleTimeString('en-IN');
            return timeString.slice(0, timeString.length - 6) + timeString.slice(timeString.length - 3, timeString.length);
        }

        return `${day} ${month.slice(0, 3)}`;
    }

    return (
        <Paper
            elevation={4}
        >
            <Stack
                direction='row'
                p={2}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 80px 80px',
                    alignItems: 'center',
                    gap: '20px'
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox checked={checked} onChange={handleChange} />
                    }
                    label={text}
                />
                <Chip label={formatDueDate(dueDate)} />
                <TodoFormDialog actionType='edit' />
            </Stack>
        </Paper>
    )
}

export default TodoItem