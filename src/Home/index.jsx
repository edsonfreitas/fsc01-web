import { HeartIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect } from 'react';

//Component TweetForm
const MAX_TWEET_CHARGE = 250;
/*TweetForm----->*/
function TweetForm( {loggedInUser, onSuccess}){
  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        headers:{
          'authorization': `Bearer ${loggedInUser.accessToken}`
        },
        data: {
        text: values.text
      }
    })

    form.setFieldValue('text', '')
    onSuccess()
  },
    initialValues:{
      text: ''
    }
   })

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
        <form 
        onSubmit={formik.handleSubmit} 
        className='pl-12 text-lg flex flex-col'>
          <textarea  
          name="text"
          value={formik.values.text}
          placeholder='O que está acontecendo' 
          className='bg-transparent outline-none disabled:opacity-50'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          />
              {/*Botão*/}
            <div 
            className='flex justify-end items-center space-x-3'>
              <span 
              className='text-sm'>
              <span>{formik.values.text.length}</span> / <span className='text-birdBlue'>{MAX_TWEET_CHARGE}</span>  
              </span>
              <button
              type='submit' 
              className='bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50'
              disabled={formik.values.text.length > MAX_TWEET_CHARGE || formik.isSubmitting}
              >
                Tweet
              </button>
            </div>
          </form>
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
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`,{
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
      <TweetForm  loggedInUser={loggedInUser} onSuccess={getData}/>
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


