# Portfolio Client

Portfolio Client is a responsive web application built with Vite and React to showcase portfolio work. 

The objective of this site is to provide an engaging and user-friendly interface to contact me.

The Deployed Site is available [HERE]()

![Site view across devices]()

## Table of Contents

- [UX](#ux)
  - [Current User Goals](#current-user-goals)
  - [New User Goals](#new-user-goals)
  - [Agile Planning](#agile-planning)
- [Design](#design)
  - [Colour](#colour)
  - [Typography](#typography)
  - [Layout](#layout)
- [Features](#features)
- [Testing](#testing)
  - [HTML Validation](#html-validation)
  - [CSS Validation](#css-validation)
  - [ESLint Validation](#eslint-validation)
  - [Lighthouse Testing](#lighthouse-testing)
  - [Manual Tests](#manual-tests)
- [Technologies Used](#technologies-used)
  - [Languages Used](#languages-used)
  - [Libraries and Frameworks Used](#libraries-and-frameworks-used)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Media](#media)
  - [Code](#code)

## UX

### Current User Goals

- Seamlessly manage and display portfolio items.
- Utilize a responsive design to ensure accessibility across devices.
- Interact with a clean and user-friendly interface.

### New User Goals

- Quickly understand and navigate the platform.
- Easily add and manage portfolio items.

### Agile Planning

- Development followed an agile approach, with iterative cycles to ensure the application meets user needs.
- User stories and tasks were managed on a Kanban board.

## Design

### Colour

The aim of the colour scheme is to provide a professional and calming user experience.

1. YInMn Blue (#355070)
2. Chinese Violet (#6D597A)
3. Thulian Pink (#B56576)
4. Powder Blue (#A0AEC1)
5. Light Coral (#E56B6F)

<details>
    <summary>Click to see Colour Palette</summary>
</details>

### Typography

The main typography used is `Montserrat`, chosen for its readability and clean aesthetics DM Serif Display for it's more curved style.

### Layout

The layout aims to provide easy navigation and distinguish between different sections intuitively.

## Features

<details>
  <summary>Click to view Features </summary>
</details>


Users can view their portfolio items in a responsive grid layout.

<details>
  <summary>Click to view Portfolio Display </summary>
</details>

#### Detailed View of Portfolio Item

Users can click on a portfolio item to view its detailed description and related information about each project in the list.

<details>
  <summary>Click to view Detailed Portfolio Item </summary>
</details>





<details>
  <summary>Click to view Add/Edit Portfolio Item </summary>
</details>

### Future Features

- Advanced filtering and search.
- Integration with social media.
- Analytics and visitor tracking.

## Testing

### HTML Validation

### CSS Validation

### ESLint Validation

### Lighthouse Testing

### Manual Tests

<details>
  <summary>Click to view Manual Tests</summary>

| Test Case # | Description                       | Steps                                             | Expected Result                                    | Actual Result |
|-------------|-----------------------------------|--------------------------------------------------|--------------------------------------------------|---------------|
| 1           | User Registration                 | 1. Navigate to "/register".<br>2. Fill out and submit the form. | User is registered and redirected to the login page. | Works         |
| 2           | User Login                        | 1. Navigate to "/login".<br>2. Enter credentials and submit. | User is logged in and redirected to the homepage. | Works         |
| 3           | Add Portfolio Item                | 1. Navigate to "/add".<br>2. Fill out and submit the form. | New item is added to the portfolio list.          | Works         |

</details>

### Unfixed Bugs

- Sometimes the portfolio grid does not update immediately after adding a new item. A potential solution is to implement real-time updates using websockets or a polling mechanism.

## Technologies Used

### Languages Used

- JavaScript
- CSS
- HTML

### Libraries and Frameworks Used

- React
- Vite
- React Router
- Axios
- Bootstrap (for grid layout, although custom CSS is preferred)

## Deployment


## Credits





