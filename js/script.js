// Copyright (c) 2024 Kai Nguyen All rights reserved
//
// Created by: Kai Nguyen
// Created on: May 2024
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


let score = 0
let highScore = 0
let hiddenNumber = Math.floor(Math.random() * 100) + 1
let tries = 7

// images
let happyFace = '<img src="./images/happy-emoji.svg" alt="happy face">'
let sadFace = '<img src="./images/sad-emoji.svg" alt="sad face">'

function updateScore() {
  // save to local storage
  console.log(highScore)
  if (localStorage.highScore) {
    highScore = localStorage.highScore
  } else {
    localStorage.setItem(highScore)
  }
  document.getElementById("highScore").innerHTML = "High Score: " + highScore
  document.getElementById("currentScore").innerHTML = "Score: " + score
}

function buttonClicked() {
  const userNumber = parseInt(document.getElementById("number-entered").value)
  console.log(userNumber)
  console.log(hiddenNumber)
  if ((userNumber >= 1) && (userNumber <= 100)) {
    if (userNumber == hiddenNumber) {
      score++
      document.getElementById("answer").innerHTML += "Question " + score + " correct!<br />"
      document.getElementById("image").innerHTML = happyFace
      tries = 7
      if (score > highScore) {
        highScore = score
        localStorage.highScore = highScore
        console.log(score)
        console.log(highScore)
      }
      document.getElementById("highScore").innerHTML = "High Score: " + highScore
      document.getElementById("currentScore").innerHTML = "Score: " + score
      hiddenNumber = Math.floor(Math.random() * 100) + 1
    } else if (userNumber > hiddenNumber) {
      document.getElementById("hint").innerHTML = "Incorrect, the number is lower.<br /><br />"
      document.getElementById("image").innerHTML = sadFace
      tries--
    } else if (userNumber < hiddenNumber) {
      document.getElementById("hint").innerHTML = "Incorrect, the number is higher.<br /><br />"
      document.getElementById("image").innerHTML = sadFace
      tries--
    }
    if (tries == 0) {
      document.getElementById("hint").innerHTML = "Game over! The number was: " + hiddenNumber + ". Your score is " + score + "<br />" + /*'<button class="reloadButton" onclick="reload()">' + "Click to play again</button>" */
      /* document.getElementById("end").innerHTML = "Click to play again" */
      function reload() {
        location.reload()
      }
    }
    document.getElementById("tries").innerHTML = "Tries remaining: " + tries
  } else {
    document.getElementById("hint").innerHTML = "Error! Please enter a valid number from 1-100"
  }
}