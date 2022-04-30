import { styled } from "@mui/material"
import { Button } from "@mui/material"

const PrimaryButton = styled(Button)`
    background: rgb(66, 66, 251);
    width: 150px;
    height: 50px;

    :hover  {
        background-color: white;
        color:  rgb(66, 66, 251);
    }
`

export default PrimaryButton