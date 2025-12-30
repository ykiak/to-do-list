# To-Do List
To-do list application built with JavaScript that allows users to create, edit and delete tasks

## DEMO
https://ykiak.github.io/to-do-list/

## Features
- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as done or undone
- Persist tasks using browser localStorage
- Filter tasks by status (done, undone, all)
- Search tasks based on selected filter

## Technical Decisions
- Tasks are stored as objects with unique IDs
- localStorage is used to persist tasks after closing the browser
- No external libraries to practice DOM manipulation and JS core skills
- Uses the "input" event to enable real-time search
- Modularized architecture to simulate professional development

## Technologies
- HTML5
- CSS3
- JavaScript (vanilla)
- localStorage
- ES modules

## Structure
- script/render.js => UI and DOM manipulation
- script/crud.js => functions that returns arrays (for localStorage changes)
- script/search.js and script/filters.js => isolated logic that returns arrays with conditional elements
- script/state.js => get and save data
- script/utils.js => helpers (currently, just generateId function)
- script/main.js => handlers and function control
- index.html => basic HTML file
- style.css => general styling of the project

## Status
This project is under development.
