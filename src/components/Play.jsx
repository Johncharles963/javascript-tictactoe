import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Play = () => {
    const [gameSquares, setGameSquares] = useState()
    const [cpuLetter, setCpuLetter] = useState('o')
    const [userLetter, setUserLetter] = useState('x')
    const [gameOver, setGameOver] = useState(false)
    const [paused, setPaused] = useState(false)
    const [aiTurn, setAiTurn] = useState(false)
    const [message, setMessage] = useState('')
    const [cpuFirst, setCpuFirst] = useState(false)
    const navigate = useNavigate();
    const [turn, setTurn] = useState(0)

    useEffect(() => {
        addItemsToArray();
        changeFirst()
    }, []);

    const changeFirst = () =>{
        setCpuFirst(!cpuFirst)
        if(!cpuFirst){
            setAiTurn(true)
            setCpuLetter('x')
            setUserLetter('o')
        }
        else{
            setAiTurn(false)
            setCpuLetter('o')
            setUserLetter('x')
        }
        setTurn(0)
    }
    const unbeatableAI = () => {
        setTurn(turn + 1)
        console.log(turn)
        console.log('hit')
        let possibleMoves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6,], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]]
        if (checkIfGameOver(possibleMoves, 'player')) {
            setGameOver(true)
        }
        else  {
            setTimeout(() => {
                if (winOrBlock(possibleMoves, 'win')) {
                }
                else if (winOrBlock(possibleMoves, 'block')) {

                }
                else {
                    makeRandomMove()
                }

                if (checkIfGameOver(possibleMoves, 'cpu')) {
                    setGameOver(true)
                }
                setAiTurn(false)
            }, 400);
        }
    }
    const checkIfGameOver = (incomingArr, player) => {
        let boardFull = true
        for (let i = 0; i < 8; i++) {
            let count = []
            let arr = [gameSquares[incomingArr[i][0]].value, gameSquares[incomingArr[i][1]].value, gameSquares[incomingArr[i][2]].value]
            if (arr.includes('')) {
                boardFull = false
            }
            if (player === 'cpu') {
                count = arr.filter(letter => letter == cpuLetter).length
            }
            else {
                count = arr.filter(letter => letter == userLetter).length
            }
            if (count === 3) {
                if (player !== 'cpu') {
                    setMessage('You won!')
                }
                return true
            }
        }
        if (boardFull) {
            setMessage('Its a draw!')
            return true
        }
        else
            return false
    }
    const winOrBlock = (incomingArr, moveType) => {
        for (let i = 0; i < 8; i++) {
            let count = []
            let arr = [gameSquares[incomingArr[i][0]].value, gameSquares[incomingArr[i][1]].value, gameSquares[incomingArr[i][2]].value]
            if (moveType === 'win') {
                count = arr.filter(letter => letter == cpuLetter).length
            }
            else {
                count = arr.filter(letter => letter == userLetter).length
            }
            if (count === 2 && arr.includes('')) {
                if (moveType === 'win')
                    setMessage('Computer wins!')
                else console.log('block')
                for (let j = 0; j < 3; j++) {
                    if (gameSquares[incomingArr[i][j]].value === '') {
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
        return false
    }
    const makeRandomMove = () => {
        let arr = [...gameSquares]
        let openMoves = []
        let cornersAndCenter = []
        let randomMove = 0
        arr.forEach((element, index) => {
            if (element.value === '') {
                if (index % 2 == 0)
                    cornersAndCenter.push(index)
                else
                    openMoves.push(index)
            }
        });
        if (cornersAndCenter.length !== 0) {
            let rnd = Math.floor(Math.random() * cornersAndCenter.length)
            randomMove = cornersAndCenter[rnd]
        }
        else {
            let rnd = Math.floor(Math.random() * openMoves.length)
            randomMove = openMoves[rnd]
        }
        arr[randomMove].value = cpuLetter
        if (cpuLetter === 'x')
            arr[randomMove].img = 'letterX.png'
        else {
            arr[randomMove].img = 'letterO.png'
        }
        arr[randomMove].value = cpuLetter
        setGameSquares(arr)
    }
    const addItemsToArray = () => {
        let arr = []
        for (let i = 0; i < 9; i++) {
            arr.push({ img: 'blank.png', value: '' })
        }
        setGameSquares(arr)
    }
    const squareClicked = (index) => {
        if (!gameOver && !aiTurn) {
            let arr = [...gameSquares]
            if (arr[index].value === userLetter) {
            }
            else if (arr[index].value === cpuLetter) {
            }
            else {
                if (userLetter === 'x')
                    arr[index].img = 'letterX.png'
                else {
                    arr[index].img = 'letterO.png'
                }
                arr[index].value = userLetter
                setGameSquares(arr)
                setAiTurn(true)
                unbeatableAI()
            }
        }
    }
    const playAgain = () => {
        addItemsToArray()
        setGameOver(false)
        setPaused(false)
        changeFirst()
    }
    const unPaused = () => {
        setPaused(false)
        setGameOver(false)
    }
    const exit = () => {
        navigate("/");
    }
    const pauseGame = () => {
        if(!gameOver){
            setMessage('Paused')
            setGameOver(true)
            setPaused(true)
        }
    }
    if (gameSquares) {
        let arr = gameSquares
        for (let i = 0; i < 9; i++) {
            arr[i].button = (<Col key={i} xs={4} className='square'><button className='btn-remove' onClick={() => { squareClicked(i) }}><Image draggable={false} fluid src={gameSquares[i].img} /></button></Col>)
        }
        if (gameSquares !== arr)
            setGameSquares(arr)
    }
    if(turn === 0 && aiTurn){
        unbeatableAI()
    }
    return (
        <div className=''>
            
            {gameOver &&
                <Row className='mx-auto popup'>
                    <Col xs={12} className='my-auto'>
                        <h1 >{message}</h1>
                    </Col>
                    <Col className='my-auto'>
                        <button onClick={() => { playAgain() }} className='play-btn fs-1'>Play Again</button>
                    </Col>
                    {paused &&
                        <Col className='my-auto'>
                            <button onClick={() => { unPaused() }} className='play-btn fs-1'>Continue</button>
                        </Col>
                    }
                    <Col className='my-auto'>
                        <button onClick={() => { exit() }} className='play-btn fs-1'>Exit</button>
                    </Col>
                </Row>
            }
            <Row className='mx-auto mt-2'>
                <Col className='fs-2 mx-auto text-center'><h2 className='point' onClick={()=>{pauseGame()}}>{aiTurn ? <>Computer Turn</> : <>Your turn</>}</h2></Col>
            </Row>
            <Row className='bg-white mx-auto board-container'>
                {gameSquares &&
                    gameSquares.map(u => { return u.button })
                }
            </Row>
            <Row className='mx-auto mt-2'>
                <Col xs={4} className='fs-2 mx-auto text-end'><h2 className='point' onClick={()=>{pauseGame()}}>Pause</h2></Col>
                <Col xs={4} className='fs-2 mx-auto'><h2 className='point' onClick={()=>{exit()}}>Home</h2></Col>
            </Row>
        </div>
    )
}
export default Play