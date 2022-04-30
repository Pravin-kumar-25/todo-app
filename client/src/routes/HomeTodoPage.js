import React from 'react'
import TodoBlock from "../components/TodoBlock";
import { Card } from "@mui/material";
import Form from "../components/Form";
import { useState, useEffect } from "react";
import Axios from '../components/Axios'
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';

const HomeTodoPage = () => {
    const navigate = useNavigate()
    const [display, setDisplay] = useState(false)
    const [todoListItems, setToDoListItems] = useState([])

    const authFunction = async () => {
        const response = await Axios.get('/auth')
        console.log(response.data)
        if (!response.data) {
            navigate('/login')
        }
    }

    useEffect(() => {
        authFunction()
    })

    async function refresh() {
        const response = await Axios.get('/')
        setToDoListItems(response.data)
    }

    return (
        <div>
            <Logout authFunction={authFunction} />
            {display ? <Form display={display} setDisplay={setDisplay} refresh={refresh} /> : null}

            <Card style={{ width: "400px" }}>
                <TodoBlock setAddToDoDisplay={setDisplay} refresh={refresh} todoListItems={todoListItems} setToDoListItems={setToDoListItems} />
            </Card>
        </div>
    )
}

export default HomeTodoPage