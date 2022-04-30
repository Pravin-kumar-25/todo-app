import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Axios from './Axios'

const TodoBlock = ({ setAddToDoDisplay, refresh, todoListItems, setToDoListItems }) => {

    // Axios.interceptors.response.use(function (response) {
    //     console.log(response.status)
    //     return response;
    //   }, function (error) {
    //       console.log(error.response.status)
    //       if(error.response.status === 401) {
             
    //       }
    //   });

    const [isResponse, setIsReponse] = useState(false)

    async function getResponse() {
        // Axios.get('/').then((res)=> console.log(res.status))
        const response = await Axios.get('/')
        // if(response.status === 400) {
        //     return;
        // }
        // console.log(response.status)
        setIsReponse(true)
        setToDoListItems(response.data)
    }
    useEffect(() => {
        getResponse()
    }, [isResponse])

    const addTodo = () => {
        setAddToDoDisplay(true)
    }

    function mapTodo() {
        if(todoListItems.length !== 0) {

            return todoListItems.map((todoItem) => {
                return <TodoItem key={todoItem["_id"]} message={todoItem.todo} id={todoItem["_id"]} refresh={refresh} checked={todoItem.checked} />
            })
        } else {
            return (
                <h3 className='empty-array-heading'>ADD YOUR TODO LIST HERE</h3>
            )
        }
    }

    return (
        <>
            <div className='todoBlock'>
                <div className='todo-heading'>

                    <Typography variant='h2'>
                        To Do
                    </Typography>
                </div>
                <Fab color="primary" aria-label="add" size='medium' style={{ float: "right", "margin": "20px 20px" }} onClick={addTodo}>
                    <AddIcon />
                </Fab>
                <List sx={{ width: '100%', maxWidth: 360 }} style={{ display: "flex", "alignItems": "center", "justifyItems": "center" }}>
                    {isResponse ? mapTodo() : <Skeleton sx={{ width: 300}} />}
                </List>
            </div>
        </>
    )
}

export default TodoBlock