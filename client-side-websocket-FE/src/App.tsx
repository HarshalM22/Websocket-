import { useEffect, useRef, useState } from "react"

function App() {
  const[message,setMessage] = useState([]);
  const wsRef = useRef();
  const inputRef = useRef();

  useEffect(()=>{
  const ws = new WebSocket("ws://localhost:8000")
  ws.onmessage = (event)=>{
    setMessage(m => [...m ,event.data])  
  }
  wsRef.current = ws ;

  ws.onopen=()=>{
    ws.send(JSON.stringify({
      type : "join",
      payload: {
        roomId :"red"
      }
    }))
  }
  return()=>{
    ws.close()
  }
  },[])

  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <div className="bg-slate-700 h-96 w-3/4 flex-col justify">
      <div className="h-full">
        {message.map(message => <div><span className="bg-black text-white max-h-full bg-scroll">{message}</span></div>)}

      </div>
      <div>
        <input type = "text" ref={inputRef} id="message"  placeholder="Message..." className="w-5/6 py-1 bg-sky-100"></input>
        <button onClick={()=>{
          const message = inputRef.current.value ;
          // console.log(message)
          wsRef.current.send(JSON.stringify({
            type : "chat",
            payload :{
              message : message 
            }
          }))
        }}
        className="bg-slate-500 w-2/12 py-1">send</button>
      </div>

    </div>
    </div>
  )
}

export default App
