import { useState,useEffect } from "react";
import toast from "react-hot-toast"

export default function Timer(){
    const [second,setSeconds]=useState(0);
    //Botón Start y Stop para controlar el intervalo.
    //Botón Reset para volver a 0.
    useEffect(()=>{
        toast.success("Timer fue montado")

        const intervalId= setInterval(()=>{
            setSeconds((prev)=>prev+1)
        },1000);

        return()=>{
            toast.error("Timer fue desmontado")
            clearInterval(intervalId)
        };
    },[])

    return <h2> Han pasado {second} segundos</h2>
}