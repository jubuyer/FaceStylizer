import React, {useEffect, useState} from 'react'

function Index() {
  
  const [message, setMessage] = useState("Loading")

  console.log(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home")
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home").then(
      response => response.json()
    ).then(
      data => {
        console.log(data)
        setMessage(data.message)
      }
    )
  }, [])

  return (
    <div>
      <div>Return message from server</div>
      <p>this is a test div</p>
      {/* this is a comment :) */}
      <div>{message}</div>
    </div>
  )
}

export default Index