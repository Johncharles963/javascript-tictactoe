import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import {useState, useEffect} from 'react'


const Play = () => {
    const [gameSquares, setGameSquares] = useState()
    
    useEffect(() => {
        addItemsToArray()
      }, []);

    const addItemsToArray = () => {
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr.push({img: 'letterO.png', value: ''})
        }
        setGameSquares(arr)       
        
    }
    const squareClicked = (index) => {
        let arr = [...gameSquares]
        if(arr[index].value=== 'x')
        {
            alert('You have this')
        }
        else if(arr[index].value=== 'o')
        {
            alert('Enemy has this')
        }
        else{
            arr[index].img = 'letterX.png'
            arr[index].value = 'x'
            setGameSquares(arr)
        }
    }
    const addHTML =() =>{
        let arr = gameSquares
        for (let i = 0; i < 9; i++) {
            arr[i].button = (<Col key={i} xs={4} className='square'><button className='btn-remove' onClick={() => { squareClicked(i) }}><Image fluid src={gameSquares[i].img} /></button></Col>)
        }
        if(gameSquares !== arr)
        setGameSquares(arr)
        }
    
    if(gameSquares)addHTML()
    return (
        <Container className='bg-primary mx-auto align-self-center' style={{ width: "700px" }}>
            <Row>
                {gameSquares &&
                    gameSquares.map(u => {return u.button})
                }
            </Row>
        </Container>
    )
}
export default Play