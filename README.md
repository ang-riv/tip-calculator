# Tip Calculator

A React app that calculates the tip amount based on the bill total, selected tip percent, and number of people the bill is being split between. Built as solution to a [FrontendMentor Challenge](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX).

### Built with:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)

- Dependencies:
  - [useWindowSize](https://usehooks.com/usewindowsize)
  - [fitty](https://github.com/rikschennink/fitty)

![Desktop View](./src/assets/desktop-view.png)

### Deployment

https://ang-riv.github.io/tip-calculator/

## Introduction

Tip Calculator is a straightforward app that displays the total amount that each person will pay based on the tip percent chosen.

## Features

- **Immediate calculation:** the moment the user inputs all the required information, the tip and total amount per person is calculated and displayed right away.
- **Selected Tip Percent:** when the user selects the tip percent using the buttons, the button style changes to match the hover style to show which percent has been chosen.
- **Custom Tip Percent:** users can enter a specific number if they want a percentage that is different from the predefined number buttons.

## Challenges

- **Problem**: The challenge doesn't include tablet designs, so I wasn't sure what those should look like as the mobile version would look too small/stretched out on a tablet size and the desktop wouldn't fit horizontally on smaller tablet screens.
  - **Solution**: Added max-widths and max-heights on both the main container as well as in certain sections to prevent the design from looking too big on tablet screens.
- **Problem**: When all information was entered by the user and then they decide to change the tip percent, the updated totals wouldn't be shown.
  - **Solution**: Found out that the totals were being calculated with the new tip percents, it just wasn't being re-rendered. Added the tip percent to the useEffect dependencies array so it would render and show the new total.
