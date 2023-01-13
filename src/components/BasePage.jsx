import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'

const BasePage = () => {
    return (
        <Container className='container-bg d-flex' fluid >
            <Outlet />
        </Container >
    )
}

export default BasePage