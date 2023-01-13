import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col' 
import Image from 'react-bootstrap/Image'
// "https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_O_blue-1024.png"
// "https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_X_blue-1024.png"

const Play = () => {
    const makeSquares = () => {
        const squareClicked = (index) =>{
            alert('Clicked ' + index)
        }
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr.push(<>
                <button className='btn-remove' onClick={()=>{squareClicked(i)}}><Image fluid src="Letter0.png"/></button>
            </>)
        }
        return (<>
            {arr.map((row, index) => { return (<Col key={index} xs={4} className='square'>{row}</Col>) })}
        </>
        )
    }
    return (
        <Container className='bg-primary mx-auto align-self-center' style={{width: "700px"}}>
            <Row>
            {
                makeSquares()
            }
            </Row>
        </Container>
    )
}
export default Play
