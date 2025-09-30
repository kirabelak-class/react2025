import { useRef } from "react"


export default function CounterRef() {

  const count = useRef(0)


  const handleClick = () => {

    count.current += 1

    console.log("Clicks:", count.current)

  }


  return <button onClick={handleClick}>Haz clic</button>

}