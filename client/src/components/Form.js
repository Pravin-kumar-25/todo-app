import React, { useRef, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Backdrop from '@mui/material/Backdrop';
import Grow from '@mui/material/Grow';
import { gsap} from 'gsap'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import Axios from './Axios'


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'green',
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
    },
});

const Form = ({ display, setDisplay,refresh }) => {
    const [inputValue,setInputValue] = useState();
    const [loading,setLoading] = useState(true)
    const formRef = useRef()

    useEffect(() => {
      if(!display) {
          gsap.to(formRef.current, {scale:0})
      }
    },[display])
    

    const handleBackdropClose = (e) => {
        if (!formRef.current.contains(e.target)) {
          gsap.to(formRef.current, {scale:3})
        setDisplay(false)
        }
    }
    const handleClose = () => {
        gsap.to(formRef.current, {scale:0})
        setDisplay(false)
    }

    const onChangeEvent = (e) => {
        if(e.target.value === "") {
            setLoading(true)
        } else {
            setLoading(false)
        }
        setInputValue(e.target.value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        if(!loading) {
            setLoading(true)
            Axios.post('/',{
                todo:inputValue
            }).then((res)=> {
                setLoading(false)
                setDisplay(false)
                refresh()
            })
        }
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={display}
            onClick={handleBackdropClose}
        >
            <Grow
                in={display}
                style={{ transformOrigin: '0 1 0' }}
            >
                <form className='form' ref={formRef} onSubmit={onFormSubmit} >
                    <IconButton
                        aria-label="open"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <FormControl>
                        <CssTextField label="Add To do" color='error' id="custom-css-outlined-input" onChange={onChangeEvent} autoComplete="off"/>
                        <Button style={{width:"150px",alignSelf:"flex-end",position:"relative",top:"5px"}} variant='contained'
                            disabled={loading}
                            onClick={onFormSubmit}
                        >
                            Add To do
                        </Button>
                    </FormControl>
                </form>

            </Grow>
        </Backdrop>
    )
}

export default Form