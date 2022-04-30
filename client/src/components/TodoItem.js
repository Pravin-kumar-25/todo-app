import React, { useState } from 'react'
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, Fab, ListItemButton } from '@mui/material';
import Input from '@mui/material/Input';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import Axios from './Axios'


const TodoItem = ({ message, id, refresh, checked }) => {
    const [editMode, setEditMode] = useState(false);
    const [updateValue, setUpdateValue] = useState(message);
    const [check, setCheck] = useState(checked)

    const onTextChange = (e) => {
        setUpdateValue(e.target.value);
    }

    const onDeleteButton = (e) => {
        Axios.delete(`/todo/${id}`).then((res) => {
            refresh()
        })
    }

    const textField = () => {
        return (
            <>
                <form onSubmit={onEdit} className='edit-form'>

                    <Input id="component-simple" onChange={onTextChange} value={updateValue} margin='none' sx={{ height: "42px", position: "relative", bottom: "10px", width: "85%", left: "40px" }}
                        error={updateValue === "" ? true : false}
                    />
                </form>
            </>
        )
    }

    const onCheckBoxClick = (e) => {
        console.log(e.target.checked)
        setCheck(e.target.checked)
        Axios.put(`/todo/${id}`, {
            checked: e.target.checked
        })
            .then((res) => {
                // refresh()
                console.log(res.data)
            })
    }

    const listAndCheckBox = () => {
        return (
            <>
                <Checkbox
                    checked={check}
                    onClick={onCheckBoxClick}
                >
                </Checkbox>
                <ListItemText>
                    {updateValue}
                </ListItemText>
            </>
        )
    }

    const onEdit = (e) => {
        e.preventDefault()
        // if()
        if (editMode && updateValue !== "") {
            Axios.put(`/todo/${id}`, {
                todo: updateValue
            })
                .then((res) => {
                    // refresh()
                })
        } else if (updateValue === "") {
            setUpdateValue(message)
            // refresh()
        }
        setEditMode(!editMode)
    }

    return (
        <ListItem
            disablePadding
        >
            <ListItemButton>
                {editMode ? textField() : listAndCheckBox()}
            </ListItemButton>
            <IconButton edge="start" aria-label="delete" onClick={onDeleteButton}>
                <DeleteIcon />
            </IconButton>
            <Fab color={editMode ? 'success' : 'secondary'} size='small' style={{ "zIndex": 2 }} onClick={onEdit}>
                {editMode ? <DoneIcon /> : <EditIcon />}
                {/* <EditIcon /> */}
            </Fab>
        </ListItem>
    )
}

export default TodoItem