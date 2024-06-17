// Copyright (c) 2024 Kai Nguyen All rights reserved
//
// Created by: Kai Nguyen
// Created on: june 2024
// This file contains the JS functions for index.html
"use strict"

/**
 * Check service worker.
 */
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/ICD2O-1-2023-Final-Project-Kai-Nguyen/sw.js", {
    scope: "/ICD2O-1-2023-Final-Project-Kai-Nguyen/",
  })
}

const powerUpImgCon = document.getElementById("powerUpPlace")
const powerUpInterval = setInterval(createPowerUp, 20000)

function updateScore() {
  // save to local storage
  console.log(highScore)
  if (localStorage.highScore) {
    highScore = localStorage.highScore
  } else {
    localStorage.setItem(highScore)
  }
  triesUpdate()
  document.getElementById("highScore").innerHTML = "High Score: " + highScore
  document.getElementById("currentScore").innerHTML = "Score: " + score
}

function createPowerUp() {
  let powerUpImg = new Image()
  powerUpImg.src = "./images/lightningBolt.svg"
  powerUpImg.style.width = "50px"
  powerUpImg.style.height = "100px"
  powerUpImg.style.x = (Math.random() * (document.body.scrollWidth)).toFixed()
  powerUpImg.style.y = (Math.random() * (document.body.scrollHeight - 200)).toFixed()
  powerUpImg.style.position = "absolute"
  powerUpImg.style.left = powerUpImg.style.x + 'px'
  powerUpImg.style.top = powerUpImg.style.y + 'px'
  powerUpImgCon.appendChild(powerUpImg)
  powerUpImg.addEventListener("click", function() {
    powerUpFunc()
    powerUpImg.style.display = "none"
  }, {capture: true})
}

function powerUpFunc() {
  const powerUpAbilities = ["Half tries but reveals a digit", "+2 tries", "+1 try", "-1 try", "-2 tries", "Unlimited tries but only 10 seconds"]
  let currentPowerUp = powerUpAbilities[Math.floor(Math.random() * powerUpAbilities.length)]
  console.log(currentPowerUp)
  document.getElementById("powerUpTxt").innerHTML = currentPowerUp
  if (currentPowerUp == powerUpAbilities[0]) {
    tries = tries / 2 + 0.1
    console.log(tries)
    triesUpdate()
    if (hintNum[1] == null) {
      document.getElementById("hint").innerHTML = "the first digit of your number is... 0"
    } else {
      document.getElementById("hint").innerHTML = "the first digit of your number is... " + hintNum[0]
    }
  } else if (currentPowerUp == powerUpAbilities[1]) {
    tries = tries + 2
    triesUpdate()
  } else if (currentPowerUp == powerUpAbilities[2]) {
    tries++
    triesUpdate()
  } else if (currentPowerUp == powerUpAbilities[3]) {
    tries--
    triesUpdate()
  } else if (currentPowerUp == powerUpAbilities[4]) {
    tries = tries - 2
    triesUpdate()
  } else if (currentPowerUp == powerUpAbilities[5]) {
      time = 20
      timerLoop = setInterval( function() {
        if (time > 0) {
          console.log(time)
          time--
          document.getElementById("powerUpTxt").innerHTML = "Time Remaining: " + time
          tries = 100
          triesUpdate()
        }
        if (time == 0) {
          gameOver()
        }
      }, 1000) 
  } 
}

function reveal() {
  let visible = document.getElementById("end")
  if (visible.style.display === "none") {
    visible.style.display = "block"
  } else {
    visible.style.display = "none"
  }
}

function reloadPage() {
  location.reload()
}

let timerLoop
let time
let score = 0
let highScore = 0
let hiddenNumber = Math.floor(Math.random() * 99) + 1
let tries = 5
let hintNum
// images
let happyFace = '<img src="./images/happy-emoji.svg" alt="happy face">'
let sadFace = '<img src="./images/sad-emoji.svg" alt="sad face">'

function gameOver() {
  console.log("Game Over")
  document.getElementById("hint").innerHTML = "Game over! The number was: " + hiddenNumber + ". Your score is " + score + "<br />"
  reveal()
  clearInterval(powerUpInterval)
  clearInterval(timerLoop)
}

function buttonClicked() {
  hintNum = hiddenNumber.toString()
  console.log(hintNum[0])
  const userNumber = parseInt(document.getElementById("number-entered").value)
  console.log(userNumber)
  console.log(hiddenNumber)
  if ((userNumber >= 1) && (userNumber <= 99)) {
    if (userNumber == hiddenNumber) {
      clearInterval(timerLoop)
      score++
      document.getElementById("answer").innerHTML += "Question " + score + " correct!<br />"
      document.getElementById("image").innerHTML = happyFace
      document.getElementById("hint").innerHTML = ""
      tries = 5
      triesUpdate()
      if (score > highScore) {
        highScore = score
        localStorage.highScore = highScore
        console.log(score)
        console.log(highScore)
      }
      document.getElementById("highScore").innerHTML = "High Score: " + highScore
      document.getElementById("currentScore").innerHTML = "Score: " + score
      hiddenNumber = Math.floor(Math.random() * 99) + 1
    } else if (userNumber > hiddenNumber) {
      document.getElementById("hint").innerHTML = "Incorrect, the number is lower.<br /><br />"
      document.getElementById("image").innerHTML = sadFace
      tries--
    } else if (userNumber < hiddenNumber) {
      document.getElementById("hint").innerHTML = "Incorrect, the number is higher.<br /><br />"
      document.getElementById("image").innerHTML = sadFace
      tries--
    }
    triesUpdate()
  } else {
    document.getElementById("hint").innerHTML = "Error! Please enter a valid number from 1-100"
  }
}

function triesUpdate() {
  document.getElementById("tries").innerHTML = "Tries remaining: " + Math.round(tries)
  if (tries <= 0) {
    gameOver()
  }
}

