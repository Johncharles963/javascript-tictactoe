import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { useState, useEffect } from 'react'


const Play = () => {
    const [gameSquares, setGameSquares] = useState()
    const [cpuLetter, setCpuLetter] = useState('o')
    const [userLetter, setUserLetter] = useState('x')


    useEffect(() => {
        addItemsToArray()
    }, []);

    const unbeatableAI = () => {
        makeWinningMove([0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6,], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8])
    }
    const makeWinningMove = (...incomingArr) => {
        for (let i = 0; i < 8; i++) {
            let arr = [gameSquares[incomingArr[i][0]].value, gameSquares[incomingArr[i][1]].value, gameSquares[incomingArr[i][2]].value]
            let count = arr.filter(x => x == cpuLetter).length;
            console.log(count)
            if (count === 2 && arr.includes('')) {
                for (let j = 0; j < 3; j++) {
                    console.log(gameSquares[incomingArr[i][j]])
                    if (gameSquares[incomingArr[i][j]].value === '') {
                        console.log('winning: ' + gameSquares[incomingArr[i][j]])
                        let tempArr = [...gameSquares]
                        tempArr[incomingArr[i][j]].value = cpuLetter
                        if (cpuLetter === 'x')
                            tempArr[incomingArr[i][j]].img = 'letterX.png'
                        else {
                            tempArr[incomingArr[i][j]].img = 'letterO.png'
                        }
                        setGameSquares(tempArr)
                        break
                    }
                }
                return true
            }
        }

    }
    const blockWinningMove = () => {

    }
    const makeRandomMove = () => {

    }
    const addItemsToArray = () => {
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr.push({ img: 'blank.png', value: '' })
        }
        setGameSquares(arr)
    }
    const squareClicked = (index) => {
        let arr = [...gameSquares]
        if (arr[index].value === userLetter) {
            alert('You have this')
        }
        else if (arr[index].value === cpuLetter) {
            alert('Enemy has this')
        }
        else {
            if (userLetter === 'x')
                arr[index].img = 'letterX.png'
            else {
                arr[index].img = 'letterO.png'
            }
            arr[index].value = userLetter
            setGameSquares(arr)
        }
        unbeatableAI()
    }
    if (gameSquares) {
        let arr = gameSquares
        for (let i = 0; i < 9; i++) {
            arr[i].button = (<Col key={i} xs={4} className='square'><button className='btn-remove' onClick={() => { squareClicked(i) }}><Image fluid src={gameSquares[i].img} /></button></Col>)
        }
        if (gameSquares !== arr)
            setGameSquares(arr)
    }
    return (
        <Container className='bg-white mx-auto align-self-center' style={{ width: "700px" }}>
            <Row>
                {gameSquares &&
                    gameSquares.map(u => { return u.button })
                }
            </Row>
        </Container>
    )
}
export default Play