/* eslint-disable react-hooks/exhaustive-deps */

import ImageCard from '../../image/cartaPokemon.png'
import fundo from '../../image/fundodourado.jpg'
import './cardInfo.css'
import  { useEffect, useState } from 'react'

export default function CardInfo() {

    const [data,setData]=useState([])
    const [array,setArray]=useState([])
    const [image,setImage]=useState()
    const [move,setMove]=useState([])
    const [move1,setMove1]=useState([])
    const array1=[{ability:{name:'NOT FOUND'}}]
    const [ searchNumber,setSearchNumber]=useState(1)
   
    async function api(query){
        if(query==''){
            query=searchNumber
        }
        const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        console.log(res)
        if(res.status===200){
            
            const data = await res.json()
            setArray(data.abilities)
            setSearchNumber(data.id)
            setData(data)
            const imagem=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            setImage(imagem)
            const move=data.moves[1].move.name
            const move1=data.moves[10].move.name
            setMove(move)
            setMove1(move1)

        }else if(res.status===404){

            setData({name:'NOT FOUND'})
            setImage(fundo)
            setMove('NOT FOUND')
            setMove1('NOT FOUND')
            setArray(array1)

        }
    }  

    const submitForm=(e)=>{
        e.preventDefault()
        const valueInput = e.target[0].value
        api(valueInput.toLowerCase())
        e.target[0].offsetParent.firstChild.value=''

    }

    useEffect(()=>{
        api(searchNumber)
    },[ searchNumber])
   
    const next=()=>{
        setSearchNumber(next => next + 1)
        
    }

    const prev=()=>{
        if(searchNumber>1){
            setSearchNumber(next => next - 1)
            
        }  
    }
    
  return (
    
    <main className="mainCard" >
        <h1>Pokemon Card</h1>
        <div className="card">
            <img src={ImageCard} alt="imagemCard" className="imageCard"/>
            <div className="imagePokemon">
                <img src={image} 
                alt="imagePokemon" className="image"/>
            </div>
            <div className="infoCard" >
                <h1>{String(data.name).toUpperCase()} -- {data.id}</h1>
            </div>
            <div className='flex'>
                <span>Ability:{array.map((e)=>` /${e.ability.name}`)} </span>
                    
                <span>Moves:{` /${move} /${move1}`} </span>    

                <span>Base Experience: {data.base_experience}</span>               
            </div>
            <form className='contentInput' onSubmit={submitForm} type='submit'>
                <input type="text" className='input' placeholder='Name or Number' />
            </form>         
        </div>
        <div className='contentButton'>
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
        </div>
    
    </main>
    
  )
}
