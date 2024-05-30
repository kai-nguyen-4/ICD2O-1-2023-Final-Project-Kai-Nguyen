// Copyright (c) 2024 Kai Nguyen All rights reserved
//
// Created by: Kai Nguyen
// Created on: May 2024
// This file contains the JS functions for index.html
"use strict"

/**
 * Check service worker.
 */
/*if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/ICS2O-Unit-6-04-kai-nguyen-4/sw.js", {
    scope: "/ICS2O-Unit-6-04-kai-nguyen-4/",
  })
}*/

let score = 0
let highScore = 0
let hiddenNumber = Math.floor(Math.random() * 100) + 1
let tries = 7

function updateScore() {
  // save to local storage
  console.log(highScore)
  if (localStorage.highScore) {
    highScore = Number(localStorage.highScore)
  } else {
    localStorage.highScore = highScore
  }
  document.getElementById("highScore").innerHTML = "High Score: " + highScore
}

window.onload = function() {
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
      tries = 7
      if (score > highScore) {
        highScore = score
        localStorage.highScore = highScore
        console.log(score)
        console.log(highScore)
      }
      hiddenNumber = Math.floor(Math.random() * 100) + 1
    } else if (userNumber > hiddenNumber) {
      document.getElementById("hint").innerHTML = "Incorrect, the number is lower."
      tries--
    } else if (userNumber < hiddenNumber) {
      document.getElementById("hint").innerHTML = "Incorrect, the number is higher."
      tries--
    }
    if (tries == 0) {
      document.getElementById("answer").innerHTML = "Game over! The number was: " + hiddenNumber + ". Your score is " + score
    }
    document.getElementById("tries").innerHTML = "Tries remaining: " + tries
  } else {
    document.getElementById("answer").innerHTML = "Error! Please enter a valid number from 1-100"
  }
}