// Copyright (c) 2024 Kai Nguyen All rights reserved
//
// Created by: Kai Nguyen
// Created on: june 2024
// This file contains the JS functions for a usable powerup
"use strict"

window.onload = function() {
    function createPowerUp() {
        const powerUpXLocation = Math.floor(Math.random() * 1920) + 1
        const powerUpYLocation = Math.floor(Math.random() * 1080) + 1
        const powerUp = this.physics.add.sprite(powerUpXLocation, powerUpYLocation, 'powerUp')
        this.powerUpGroup.add(powerUp)
    }

    this.load.image('powerUp', './images/lightningBolt.svg') 
}