---
title: 'Working With BLE in React Native'
excerpt: 'With the rise of IoT and Home Automation, the Bluetooth protocol almost became popular to use for devices comunication. Learning and praticing about new protocols is important and today we are going to learn how to work with Bluetooth Low Energy in React Native.'
coverImage: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**BLE**%20in%20React%20Native&images=https://cdn.worldvectorlogo.com/logos/react-2.svg'
date: '2020-12-30T01:00:00.322Z'
author:
  name: Lucas Henrique
  picture: '/assets/blog/authors/luk3skyw4lker.jpg'
ogImage:
  url: 'https://thumbnail-generator.vercel.app/api/thumbnail.png?title=**BLE**%20in%20React%20Native&images=https://cdn.worldvectorlogo.com/logos/react-2.svg'
---

## What is Bluetooth and BLE?

First of all, let's go through what is Bluetooth and BLE. The Bluetooth protocol is a short-range wireless technology used for exchanging data between fixed and mobile devices over short ranges, data such as files between two mobile cell phones or music players with wireless headphones. It uses UHF radio waves in the ISM bands (2.4GHz), it's also used to build Personal Area Networks (PANs). It was originally built as a wireless alternative to RS-232 cables, in the most widely used form it's transmission power is limited up to 2.5 milliwatts, giving it a maximum range of 10 meters (30 feet).

Curiosity: The name of the protocol was chosen after a 10th-century Danish king called Harald Bluetooth upon the discovery of a picture of Harald's stone in the book A History Of Vikins, written by Gwyn Jones.

### Versions

There are many versions of the Bluetooth protocol, it goes from 1.0 to 5.3 with 13 versions between these two, but the most important for us today are the 5.0+ versions, where the Bluetooth Low Energy protocol was specified.

The Bluetooth Low Energy is a wireless personal area network techonology designed to be used at applications in the healthcare, fitness, beacons, security and home entertainment applications industries. It can coexist with classic Bluetooth but is independent and has no compatibility with it, it was designed to provide reduced power consumption and cost while maintaining a similar communication range.

Mobile operating systems such as iOS, Android and desktop operating systems such as Windows, Linux and macOS support BLE natively.

## What is the use of BLE?

Let's say you're building little a home automation system by yourself, some devices to turn the lights on and off, at first you would need some microcontrollers that support BLE in the first place and then build an app to comunicate with them. The first option would be to communicate via WiFi, but what if the internet is down? Here the BLE comes in play. We're going to design an app that simulates the home automation behavior with BLE.

## The application
