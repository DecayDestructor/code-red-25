import React, { useState, useEffect } from 'react'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const Hyperplexed = ({ id }) => {
  const [text, setText] = useState('HYPERPLEXED')
  const [showRedirectLink, setShowRedirectLink] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prevText) =>
        prevText
          .split('')
          .map(() => letters[Math.floor(Math.random() * letters.length)])
          .join('')
      )
    }, 30)

    const targetNode = document.getElementById(id)

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          !targetNode.classList.contains('hyperplexed')
        ) {
          handleClassRemoval()
        }
      }
    })

    observer.observe(targetNode, { attributes: true })

    return () => {
      clearInterval(intervalId)
      observer.disconnect()
    }
  }, [id])

  const handleClassRemoval = () => {
    setShowRedirectLink(true)
  }

  return (
    <div id={id} className="my-5">
      {showRedirectLink ? (
        <div className="bg-black/80 text-white p-5 rounded-lg text-center max-w-[80%] mx-auto">
          <p></p>
          <a
            href="https://www.youtube.com/watch?v=lr1L_xUKB1E"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 underline"
          >
            Visit YouTube
          </a>
        </div>
      ) : (
        <h1
          className={`text-white text-2xl font-mono my-5 ${
            id.endsWith('1') || id.endsWith('3')
              ? '-translate-y-[10px]'
              : 'translate-y-[10px]'
          }`}
        >
          {text}
        </h1>
      )}
    </div>
  )
}

const App = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center bg-black rounded-2xl p-16 w-[90vw] max-w-7xl h-[70vh] overflow-hidden shadow-[0_0_30px_rgba(255,255,0,0.8)] text-center">
        <Hyperplexed id="component-1" />
        <Hyperplexed id="component-2" />
        <Hyperplexed id="component-3" />
        <Hyperplexed id="component-4" />
      </div>
    </div>
  )
}

export default App
