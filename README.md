# SamStore — E-Commerce Frontend

A modern, modular React frontend for **SamStore**, an e-commerce application designed to provide a complete product browsing and management experience through a responsive web interface.

The application integrates with a RESTful backend to handle dynamic product data, authentication, categories, search, filtering, pagination and user interactions.

> **Repository:** https://github.com/ebuka-chris-dev/samstore_frontend
> **Live Url:**https://mrsamphonestore.netlify.app
> 

---

## Overview

SamStore is a full-stack e-commerce application built around a React frontend and Node.js/Express backend.

The frontend is responsible for the presentation layer and client-side application logic, providing reusable interfaces for product discovery, authentication, product management and administrative workflows.

The application uses a modular architecture that separates:

* UI components
* Pages/views
* Authentication
* Redux state management
* API services
* Routing
* Navigation
* Configuration
* Utility functions
* Shared layouts

This separation allows features to be developed and maintained independently as the application grows.

---

## Key Features

### 🛍️ Product Management

The application provides interfaces for managing and interacting with products, including:

* Product listing
* Product details
* Product creation
* Product editing
* Product deletion
* Product search
* Category filtering
* Pagination
* Product quantity management
* Featured product information
* Multiple product images
* Rich product descriptions

The frontend communicates with the backend API to keep product data dynamic rather than relying solely on static client-side data.

---

### 🔎 Product Search & Filtering

Users can discover products through search and filtering functionality.

The application supports workflows around:

* Keyword search
* Category filtering
* Pagination
* Sorting
* Dynamic product results

This provides a more practical e-commerce browsing experience than a static product catalogue.

---

### 🔐 Authentication

The application contains a dedicated authentication layer and routing structure for protected application areas.

Authentication-related functionality is separated from the main application UI, making it easier to maintain login and account-related workflows.

The project also uses JWT-related functionality on the client side to work with the backend authentication system.

---

### 📊 Redux State Management

Redux is used to manage application state across different features.

The project contains a dedicated Redux architecture:

```text
src/
└── redux/
    ├── ...
```

Redux Toolkit, Redux Thunk and React Redux are used to support state management and asynchronous operations.

This allows API-driven application state such as product data and user information to be shared across multiple components without relying entirely on local component state.

---

### 🌐 REST API Integration

Axios is used as the HTTP client for communicating with the SamStore backend.

The frontend can interact with backend resources such as:

```text
Users
Products
Categories
Authentication
```

This creates a separation between the presentation layer and server-side business logic.

---

### 📱 Responsive UI

The interface is built using Bootstrap and Reactstrap-based components with responsive layouts.

The application can therefore adapt its interface across different screen sizes while maintaining reusable UI patterns.

---

### 📋 Data Tables

The application includes data-table functionality for displaying structured information.

This is particularly useful for administrative workflows where large amounts of product or user information need to be displayed and managed.

---

### 📈 Data Visualization

The project includes charting libraries such as:

* ApexCharts
* Recharts
* Chart.js

These provide the foundation for visualizing application and business data within dashboard-style interfaces.

---

### 📝 Form Management & Validation

Forms are handled using:

* React Hook Form
* Yup
* `@hookform/resolvers`

This provides structured form state management and client-side validation.

---

### 🔔 User Feedback

The application uses notification libraries such as React Toastify and SweetAlert2 to provide feedback for actions such as:

* Successful operations
* Validation errors
* Failed API requests
* Confirmation dialogs
* Destructive actions

---

## Technology Stack

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| React 17         | Frontend application           |
| React Router DOM | Client-side routing            |
| Redux            | Global application state       |
| Redux Toolkit    | Redux state utilities          |
| Redux Thunk      | Asynchronous state actions     |
| Axios            | REST API communication         |
| Bootstrap        | Responsive UI                  |
| Reactstrap       | React Bootstrap components     |
| React Hook Form  | Form management                |
| Yup              | Form validation                |
| ApexCharts       | Data visualization             |
| Recharts         | Data visualization             |
| Chart.js         | Data visualization             |
| React Toastify   | Notifications                  |
| SweetAlert2      | Alerts & confirmations         |
| Swiper           | Interactive sliders            |
| Sass             | Styling                        |
| CRACO            | Create React App configuration |

The dependency configuration in the repository confirms these technologies and libraries.

---

## Project Architecture

The frontend follows a modular architecture built around reusable application layers.

```text
samstore_frontend/
│
├── public/
│   └── static assets
│
├── src/
│   │
│   ├── @core/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── assets/
│   │   └── scss/
│   │
│   ├── @fake-db/
│   │
│   ├── assets/
│   │
│   ├── auth/
│   │
│   ├── configs/
│   │
│   ├── layouts/
│   │
│   ├── navigation/
│   │
│   ├── redux/
│   │
│   ├── router/
│   │
│   ├── services/
│   │
│   ├── utility/
│   │
│   ├── views/
│   │
│   ├── App.js
│   ├── index.js
│   └── index.scss
│
├── craco.config.js
├── package.json
└── package-lock.json
```

The repository's `src` directory currently separates authentication, configuration, layouts, navigation, Redux, routing, services, utilities and views.

---

## Architecture Overview

```text
                    ┌──────────────────────┐
                    │       React UI       │
                    │      Components      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Views / Pages    │
                    └──────────┬───────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
                  ▼                         ▼
          ┌───────────────┐        ┌────────────────┐
          │ Redux Store   │        │ API Services   │
          │ State/Actions │        │    Axios       │
          └───────┬───────┘        └───────┬────────┘
                  │                         │
                  └────────────┬────────────┘
                               ▼
                    ┌──────────────────────┐
                    │  SamStore REST API   │
                    │ Node / Express / DB  │
                    └──────────────────────┘
```

---

## Webpack & Module Aliases

The project uses CRACO to customize the Create React App build configuration.

Custom aliases are configured for frequently accessed application directories:

```text
@src
@assets
@components
@layouts
@store
@styles
@configs
@utils
@hooks
```

For example:

```javascript
import Component from '@components/Component'
```

instead of:

```javascript
import Component from '../../../@core/components/Component'
```

This keeps imports cleaner and makes the codebase easier to navigate.

The aliases and Sass/PostCSS configuration are defined in `craco.config.js`.

---

## API Integration

The frontend is designed to work with the SamStore backend API.

### Backend Repository

**SamStore Backend**

```text
https://github.com/ebuka-chris-dev/samstore_backend
```

The backend provides the server-side functionality for:

* Authentication
* Users
* Products
* Categories
* Product search
* Product filtering
* Pagination
* Account management

The frontend consumes these resources through HTTP requests.

---

## Data Flow

A typical product request follows this pattern:

```text
User Interaction
      │
      ▼
React Component
      │
      ▼
Redux Action / Service
      │
      ▼
Axios Request
      │
      ▼
Express REST API
      │
      ▼
MongoDB
      │
      ▼
API Response
      │
      ▼
Redux Store
      │
      ▼
React UI
```

This architecture keeps server communication separate from presentation components while allowing shared state to be consumed across the application.

---

## Authentication Flow

The authentication workflow follows a token-based architecture:

```text
User
 │
 ▼
Login Form
 │
 ▼
Frontend Validation
 │
 ▼
API Request
 │
 ▼
Backend Authentication
 │
 ▼
JWT Response
 │
 ▼
Client Authentication State
 │
 ▼
Protected Application
```

This allows authenticated areas of the application to be separated from public-facing interfaces.

---

## Forms

The application uses React Hook Form for form state management and Yup for validation.

This combination provides:

* Controlled form state
* Validation rules
* Error messages
* Reduced unnecessary re-renders
* Reusable validation patterns

---

## Styling

The project uses a combination of:

* Bootstrap
* Reactstrap
* Sass
* Custom SCSS
* CSS utility classes

CRACO is configured to support Sass and PostCSS processing, including RTL-related styling support.

---

## Development

### Prerequisites

Make sure you have:

* Node.js
* npm

---

### Installation

Clone the repository:

```bash
git clone https://github.com/ebuka-chris-dev/samstore_frontend.git
```

Navigate into the project:

```bash
cd samstore_frontend
```

Install dependencies:

```bash
npm install
```

---

## Environment Configuration

Create a local `.env` file containing the API configuration required by the application.

For example:

```env
REACT_APP_API_URL=your_backend_api_url
```

Use the environment variable names expected by the existing application configuration.

> **Never commit production credentials, tokens, private keys or other secrets to GitHub.**

---

## Running the Application

Start the development server:

```bash
npm start
```

The project uses CRACO with the OpenSSL legacy provider configured in its npm scripts for compatibility with its current Create React App/Webpack toolchain.

---

## Production Build

Create a production build:

```bash
npm run build
```

The build command uses the same CRACO configuration and compatibility setting used by the development workflow.

---

## Linting

Run ESLint:

```bash
npm run lint
```

Automatically fix supported lint issues:

```bash
npm run lint:fix
```

These scripts are defined in the repository's `package.json`.

---

## Testing

The project includes a React application test entry point:

```text
src/App.test.js
```

Tests can be executed with:

```bash
npm test
```

---

## Engineering Highlights

This project demonstrates practical experience with:

* React application architecture
* Redux state management
* Redux Toolkit
* Asynchronous Redux actions
* REST API integration
* Axios
* Authentication flows
* Client-side routing
* Protected application areas
* Form validation
* Search and filtering
* Pagination
* Reusable components
* Responsive UI development
* Data tables
* Data visualization
* SCSS
* Webpack configuration
* CRACO
* ESLint
* Modular frontend architecture

---

## What I Built

The focus of this project was not simply creating static e-commerce pages.

The frontend was structured as an application that communicates with a real backend and manages application state across multiple features.

Key engineering responsibilities include:

### Frontend Architecture

Designed a modular React structure separating views, services, state management, authentication, navigation, routing and reusable UI.

### State Management

Implemented Redux-based state management for data that needs to be shared across different areas of the application.

### Backend Integration

Integrated frontend workflows with REST APIs using Axios.

### Product Workflows

Built interfaces around product discovery, search, filtering, pagination and product management.

### Authentication

Implemented frontend authentication workflows that communicate with the backend's JWT-based authentication system.

### Form Handling

Implemented structured forms with validation using React Hook Form and Yup.

### UI Engineering

Used reusable components, Bootstrap/Reactstrap, SCSS and interactive libraries to create a responsive application interface.

---

## Full-Stack Architecture

SamStore is split into two repositories:

### Frontend

```text
React
Redux
Axios
Bootstrap / Reactstrap
```

### Backend

```text
Node.js
Express
MongoDB
Mongoose
JWT
bcrypt
```

This separation makes it possible to independently deploy and maintain the frontend and backend.

---

## Related Repository

### SamStore Backend

```text
https://github.com/ebuka-chris-dev/samstore_backend
```

The backend repository contains the REST API and server-side business logic powering the frontend.

---

## Project Structure Philosophy

The project follows a separation-of-concerns approach:

```text
UI
│
├── Views
├── Components
└── Layouts

Application State
│
└── Redux

Navigation
│
├── Router
└── Navigation

Server Communication
│
└── Services

Application Infrastructure
│
├── Configs
├── Utilities
└── Authentication
```

This structure makes individual application concerns easier to locate, modify and extend.

---

## Future Improvements

Potential improvements for future iterations include:

* Migration to a newer React/toolchain version
* TypeScript adoption
* More comprehensive automated testing
* Improved API caching
* Optimistic UI updates
* Enhanced accessibility
* Performance optimization
* CI/CD automation
* More granular authorization handling
* Expanded e-commerce workflows such as carts, orders and checkout

---

## Author

**Ebuka Chris**

Full-Stack JavaScript Developer focused on building modern web applications using:

* React
* JavaScript
* Node.js
* Express
* MongoDB
* REST APIs
* Redux

---

