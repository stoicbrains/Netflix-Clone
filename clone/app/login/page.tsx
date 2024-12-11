"use client";
import React, { useCallback, useState } from "react";
import styles from '../Styles/image.module.css';
import Input from '../components/Input';
import axios from "axios";
import { signIn } from "next-auth/react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Variant,SetVariant] = useState('login')
  
  const toggle = useCallback(()=>{
    SetVariant(currentVariant=>currentVariant==='login'?'register':'login')
  },[])


  const register = useCallback(async()=>{
    try{
      await axios.post('/api/register',{
        name:username,
        email,
        password
      })
    }
    catch(error){
      console.log(error)
    }
  },[username,email,password])

  const login = useCallback(async()=>{
    try{
      const res = await signIn('credentials',{
        email,
        password,
        callbackUrl:'/profiles'
      })
      if (res?.error) {
        alert('Login failed. Please check your credentials. with');
        console.log(res.error)
      } else {
        window.location.href = '/profiles';
      }
    }
    catch(error){
      console.log(error);
    }
  },[email,password])

  return (
    <div className={styles.bgimg}>
      <div className="[backgroundColor:rgba(100,100,100,0.50)] h-full w-full">
        <nav className={styles.bglogo}></nav>
        <div className="flex justify-center h-full w-full">
          <div className="bg-black bg-opacity-70 px-16 py-28 lg:py-16 self-center lg:w-2/5 lg:max-w-md w-full lg:h-[80%] h-full  text-black relative left-0">
            <h2 className="text-white text-4xl mb-8 font-semibold">{Variant==='login'?'Login':'Sing Up'}</h2>
            <div className="flex flex-col gap-2">
              <Input 
                id="email" 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                value={email} 
                label="Email" 
              />
              {Variant==='register'&&
              <Input 
                id="username" 
                onChange={(e) => setUsername(e.target.value)} 
                type="string" 
                value={username} 
                label="Username" 
              />
}
              <Input 
                id="email" 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                value={password} 
                label="Password" 
              />
              <div onClick={Variant==='login'?login:register} className="bg-red-600 my-5 font-semibold rounded-lg cursor-pointer tracking-wide h-[60px] flex justify-center items-center"><button>{Variant==='login'?'Sing In':'Sing Up'}</button></div>
              <div className="text-white text-sm">
              <span>{Variant==='login'?'First time using Netflix? ':'Already have an Netflix account '}</span>
              <span onClick={toggle} className="cursor-pointer font-semibold">{Variant==='login'?'Create Netflix account':'Sign in to Netflix Account'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
