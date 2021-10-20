import {React, useRef, useState, useEffect} from "react";
import './Caculator.css'
import {Actions, btnsConfig} from './btnsConfig'

const Caculator = () => {

    const elementRes = useRef(null)
    const btns = useRef(null)
    const caculator = useRef(null)

    const [operator, setOperator] = useState('')
    
    
    useEffect(() => {
       const btnOption = btns.current.querySelectorAll('.btn_option')
       Array.from(btnOption).forEach((btn) => {
           btn.style.height = btn.offsetWidth + 'px'
       })
    }, [])

    const addSpanElement = (content) => {
        const span = document.createElement('span')
        span.innerText = content
        span.style.opacity = '0'
        span.style.transform = 'translateX(2px)'

         elementRes.current.appendChild(span)

        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateX(0)'
        }, 100)

    }

    const handleClickBtn = (btn) => {
        //slove btn delete
        if(btn.action === Actions.DELETE) {
            elementRes.current.innerHTML = ''
            elementRes.current.parentElement.querySelector('.caculator__result-res:last-child').innerHTML = ''

            setOperator('')
        }

        if(btn.action === Actions.THEMES) {
            caculator.current.classList.toggle('dark')
        }

        if(btn.action === Actions.ADD) {
            const content = btn.display
            addSpanElement(content);

            const addChar = content === 'x' ? '*' : content
            const newOperator = operator + addChar
            setOperator(newOperator)
        }

        if(btn.action === Actions.CALC) {
            if(operator.trim('') <= 0) {
                return;
            }

            elementRes.current.parentElement.querySelector('.caculator__result-res:last-child').remove()

            const cloneNode = elementRes.current.cloneNode(true)
            elementRes.current.parentElement.appendChild(cloneNode)

            const transform = `translateY(${-(cloneNode.offsetHeight - 10)}px) scale(0.5)`

            try {
                const result = eval(operator)

                setOperator(result.toString())

                setTimeout(() => {
                    cloneNode.style.transform = transform
                    elementRes.current.innerHTML = ''
                    addSpanElement(Math.floor(result*10000000)/10000000)
                }, 200)
            }catch {
                setTimeout(() => {
                    cloneNode.style.transform = transform;
                    cloneNode.innerHTML = 'Syntax err';
                }, 200);
            }finally {
                console.log('completed')
            }

        }
    }



    return (
        <div ref = {caculator} className="caculator">
            <div className="caculator__result">
                <div ref = {elementRes}  className="caculator__result-res">
                </div>
                <div className="caculator__result-res">
                </div>
            </div>
            <div ref = {btns} className="caculator__btns">
                {
                    btnsConfig.map((btn, index) => {
                        return (
                            <div 
                                className = {btn.name} 
                                key = {index}
                                onClick = {() => handleClickBtn(btn)}
                            >
                                {btn.display}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Caculator