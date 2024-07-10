import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://pump.fun/*"]
}

function setTextAreaValue(value: string) {
  const commentTextArea = document.querySelector(
    'textarea[placeholder="comment"]'
  ) as HTMLTextAreaElement

  if (commentTextArea) {
    commentTextArea.value = value
    commentTextArea.dispatchEvent(new Event("input", { bubbles: true }))
    commentTextArea.dispatchEvent(new Event("change", { bubbles: true }))
    console.log(`Set textarea value to: "${value}"`)
  } else {
    console.log("Comment text area not found")
  }
}
function clickPostReplyButton() {
  const allDivs = Array.from(document.getElementsByTagName("div"))
  const postReplyElement = allDivs.find(
    (div) => div.textContent?.trim() === "[Post a reply]"
  )

  if (postReplyElement) {
    ;(postReplyElement as HTMLElement).click()
    console.log("Clicked on [Post a reply]")
    return true
  } else {
    console.log("Element [Post a reply] not found or text doesn't match")
    return false
  }
}
function clickPostReplySubmitButton() {
  const postReplyButton = Array.from(document.querySelectorAll("button")).find(
    (button) => button.textContent?.trim().toLowerCase() === "post reply"
  )

  if (postReplyButton) {
    ;(postReplyButton as HTMLElement).click()
    console.log("Clicked on Post reply button")
    return true
  } else {
    console.log("Post reply button not found")
    return false
  }
}

function clickBoardLink() {
  const boardLink = document.querySelector('a[href="/board"]')

  if (boardLink) {
    ;(boardLink as HTMLAnchorElement).click()
    console.log("Clicked on board link")
    return true
  } else {
    console.log("Board link not found")
    return false
  }
}

function clickFirstTokenLink() {
  // Find the first anchor tag that matches the pattern
  const allAnchors = Array.from(document.getElementsByTagName("a"))

  const boardLink = allAnchors[10]

  if (boardLink) {
    ;(boardLink as HTMLAnchorElement).click()
    console.log(
      "Clicked on board link:",
      (boardLink as HTMLAnchorElement).getAttribute("href")
    )
    return true
  } else {
    console.log("Board link not found")
    return false
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillTextArea") {
    setTextAreaValue(message.value)
    sendResponse({ success: true })
  }
  if (message.action === "openCommentModal") {
    const success = clickPostReplyButton()
    sendResponse({ success: success })
  }
  if (message.action === "postComment") {
    const success = clickPostReplySubmitButton()
    sendResponse({ success: success })
  }
  if (message.action === "goToBoard") {
    const success = clickBoardLink()
    sendResponse({ success: success })
  }
  if (message.action === "gotoFirstTokenLink") {
    const success = clickFirstTokenLink()
    sendResponse({ success: success })
  }
})
