import { useRef } from "react"


export default function FocusInput() {

  const inputRef = useRef()


  const focusInput = () => {

    inputRef.current.focus()

  }


  return (

    <div>

      <input ref={inputRef} placeholder="Escribe aquí..." />

      <button onClick={focusInput}>Focus</button>

    </div>

  )

}