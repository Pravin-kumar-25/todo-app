import { styled } from "@mui/material";
import {FaPowerOff} from 'react-icons/fa'

const LogoutButton = styled(FaPowerOff)`
    color:white;
    size:50px;
    transition:0.3s;

    :hover {
        color: black
    }
`

export default LogoutButton