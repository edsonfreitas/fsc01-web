import { HeartIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';

//Component TweetForm
/*TweetForm----->*/
function TweetForm(){
  const MAX_TWEET_CHARGE = 250;

  const [text, setText] = useState('')
  //Função changeText
    function changeText(e){
      setText(e.target.value)
    }
    
  return(
    <div className='border-b border-silver p-4 space-y-6'>
      <div className='flex space-x-5'>
        <img src="./images/avatar.svg" alt="" className='h-7'/>
        <h1 className='font-bold text-xl'>Página Inicial</h1>
      </div>
      <form action="" className='pl-12 text-lg flex flex-col'>
        <textarea  
        name="text"
        value={text}
        placeholder='O que está acontecendo' 
        className='bg-transparent outline-none disabled:opacity-50'
        onChange={changeText}
        />
      

      </form>
            {/*Botão*/}
          <div 
          className='flex justify-end items-center space-x-3'>
            <span 
            className='text-sm'>
             <span>{text.length}</span> / <span className='text-birdBlue'>{MAX_TWEET_CHARGE}</span>  
            </span>
            <button 
            className='bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50'
            disabled={text.length > MAX_TWEET_CHARGE}
            >
              Tweet
            </button>
          </div>
    </div>
  )
}/*<-------TweetForm*/

//Component Tweet
/*Tweet-->*/
function Tweet({name, username, avatar, children}){
  return(
    <div className="flex space-x-3 p-4 border-b border-silver">
    <div>
      <img src={avatar}/>
    </div>
     {/*Usuario*/}
      <div className="space-y-1">
      <span className="font-bold 
      text-sm">{name}</span>{' '}
      <span className="text-sm text-silver">{username}</span>
      {/*Comentario*/}
      <p>{children}</p>
      <div className='flex space-x-1 text-silver text-sm items-center'>
      {/*Icone*/}
      <HeartIcon className='w-6 stroke-1'/>
      <span>1.5k</span>
      </div>
    </div>
  </div>
  )
}//<---Tweet>

export const Home = ({ loggedInUser }) => {
  const [data, setData] = useState([])
  const loading = true

  async function getData(){
    const res = await axios.get('http://localhost:9901/tweets',{
      headers:{
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    })
    setData(res.data)
  }

  useEffect(() => {
    getData()
    console.log("Executou!")
  }, [])
  return (
    <>
      <TweetForm />
      <div>
        {data.length && data.map(tweet =>(
          <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar ="./images/avatar.svg">
          {tweet.text}
          </Tweet>
        ))}

      </div>
    </>
  )
}


