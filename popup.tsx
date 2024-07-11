import React from "react"
import { useRef, useState } from "react"

function getRandomPhrase() {
  const phrases = [
    "List on dropz.lol and I’ll ape a bag",
    "List on dropz.fun and I’ll ape a bag",
    "Get this trending on dropz.fun",
    "Get this trending on dropz.lol",
    "Dev list on dropz.fun",
    "Dev list on dropz.lol",
    "I'll buy after dropz.lol listing",
    "I'll buy after dropz.fun listing"
  ]

  const randomIndex = Math.floor(Math.random() * phrases.length)
  return phrases[randomIndex]
}

function IndexPopup() {
  const [message, setMessage] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const fillTextArea = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, {
          action: "fillTextArea",
          value: getRandomPhrase()
        })
        setMessage("Message sent to fill textarea")
      }
    })
  }
  const openCommentModal = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, { action: "openCommentModal" })
        setMessage("Message sent to open comment modal")
      }
    })
  }
  const goToBoard = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, { action: "goToBoard" })
        setMessage("Message sent to Go to board")
      }
    })
  }
  const postComment = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, { action: "postComment" })
        setMessage("Message sent to post comment")
      }
    })
  }
  const gotoFirstTokenLink = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      if (activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, { action: "gotoFirstTokenLink" })
        setMessage("Message go to new token")
      }
    })
  }

  function getRandomTime(baseTime, variance) {
    return baseTime + Math.floor(Math.random() * (variance * 2 + 1)) - variance
  }

  function runSequence() {
    gotoFirstTokenLink()
    
    setTimeout(() => {
      openCommentModal()
    }, getRandomTime(5000, 2000)) // 1 to 3 seconds
    setTimeout(() => {
      fillTextArea()
    }, getRandomTime(9000, 2000)) // 3 to 7 seconds
    setTimeout(() => {
      postComment()
    }, getRandomTime(15000, 2000)) // 7 to 11 seconds
    setTimeout(() => {
      goToBoard()
    }, getRandomTime(17000, 2000)) // 13 to 17 seconds
   
    
  }

  const startAutomation = () => {
    if (!isRunning) {
      setIsRunning(true)
      const intervalTime = getRandomTime(100000, 5000) // 59 to 61 seconds
      intervalRef.current = setInterval(runSequence, intervalTime)
      runSequence()
    }
  }

  const stopAutomation = () => {
    if (isRunning) {
      clearInterval(intervalRef.current)
      setIsRunning(false)
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <button onClick={startAutomation} disabled={isRunning}>
        Start Automation
      </button>
      <button onClick={stopAutomation} disabled={!isRunning}>
        Stop Automation
      </button>
      <button
        disabled={!isRunning}
        onClick={() => {
          openCommentModal()
          setTimeout(() => {
            fillTextArea()
          }, 1000)
          setTimeout(() => {
            postComment()
          }, 5000)
          setTimeout(() => {
            goToBoard()
          }, 9000)
          setTimeout(() => {
            gotoFirstTokenLink()
          }, 15000)
        }}>
        All Auto in one Click
      </button>
      <button disabled={!!isRunning} onClick={openCommentModal}>
        Open Comment Modal
      </button>
      <button disabled={!!isRunning} onClick={fillTextArea}>
        Fill Textarea
      </button>
      <button disabled={!!isRunning} onClick={postComment}>
        Post Comment
      </button>
      <button disabled={!!isRunning} onClick={goToBoard}>
        Post Comment
      </button>
      <button disabled={!!isRunning} onClick={gotoFirstTokenLink}>
        Go to First token
      </button>
      {message}
    </div>
  )
}

export default IndexPopup
