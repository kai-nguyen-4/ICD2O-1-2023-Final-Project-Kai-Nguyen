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
  navigator.serviceWorker.register("/ICS2O-Unit-6-04-kai-nguyen-4/sw.js", {
    scope: "/ICS2O-Unit-6-04-kai-nguyen-4/",
  })
}

let score = 0
let highScore = 0

function updateScore() {
  // save to local storage
  if (localStorage.highScore) {
    Number(localStorage.highScore) = highScore
  } else {
    localStorage.highScore = highScore
  }
  document.getElementById("highScore").innerHTML = "High Score: " + highScore
}

