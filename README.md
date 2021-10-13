## Description

This project is a team task for the React 2021q3 course from [Rolling Scopes School](https://rs.school/).

It's a pointing (or scrum) poker - an game-like instrument to make decisions for teams.

## Technology stack

| Technology | Short description | Full description |
| ------ | ------ | ------ |
| | **Development** | |
| [Create-React-App][Create-React-App] | Create React apps with no build configuration | [More details](###Create-React-App) |
| [Craco][Craco] | Create React App Configuration Override is an easy and comprehensible configuration layer for create-react-app | [More details](#Craco)
| [TypeScript][TypeScript] | A strongly typed programming language which builds on JavaScript giving you better tooling at any scale. | [More details](#TypeScript) |
| [Husky][Husky] | A tool that allows us to easily wrangle Git hooks and run the scripts we want at those stages | [More details](#Husky)
| [Eslint][Eslint] | A static code analysis tool for identifying problematic patterns found in JavaScript code | [More details](#Eslint)
| [Prettier][Prettier] | An opinionated code formatter | [More details](#Prettier)
| [Jest][Jest] | A JavaScript Testing Framework with a focus on simplicity | [More details](#Jest)
| | **Runtime** | |
| [React][React] | A free and open-source front-end JavaScript library for building user interfaces or UI components | [More details](#React) |
| [Redux-toolkit][Redux-toolkit] | The official, opinionated, batteries-included toolset for efficient Redux development | [More details](#Redux-toolkit) |
| [React-Redux][React-Redux] | An open-source JavaScript library for managing and centralizing application state | [More details](#React-Redux) |
| [Chakra-UI][Chakra-UI] | A simple, modular and accessible component library that gives you the building blocks you need to build your React applications | [More details](#Chakra-UI) |
| [React-beautiful-dnd][React-beautiful-dnd] | Assists to create beautiful drag and drop for lists with React |[More details](#React-beautiful-dnd)
| [React-rnd][React-rnd] | Allows you to create a resizable and drag-and-drop React component | [More details](#React-rnd)
| [React Slick][React-slick] | A carousel component built with React | [More details](#React-slick)
| [WebSockets][WebSockets] | An advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server | [More details](#the-websocket-api-websockets) |
| [Dompurify][Dompurify] | A DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG | [More details](#Dompurify)
| [SheetJS (xlsx)][SheetJS] | Parser and writer for various spreadsheet formats | [More details](#SheetJSxlsx)

### Create-React-App
You don’t need to install or configure tools like webpack or Babel.
They are preconfigured and hidden so that you can focus on the code.
Create a project, and you’re good to go.

### React
React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

### Redux-Toolkit

The **Redux Toolkit** package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

- "Configuring a Redux store is too complicated"
- "I have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"

### React-Redux
Centralizing your application's state and logic enables powerful capabilities like undo/redo, state persistence, and much more.
The Redux DevTools make it easy to trace when, where, why, and how your application's state changed. Redux's architecture lets you log changes, use "time-travel debugging", and even send complete error reports to a server.
Provides APIs that enable your components to interact with the Redux store, so you don't have to write that logic yourself.

### TypeScript
TypeScript includes the features that are strongly typed or Static Typing. Static typing helps us for checking type correctness at compile time.
It always highlights errors at compilation time during the time of development.
A code that speaks for itself can offset the lack of direct communication between team members.
An additional feature of using TypeScript is it allows great tooling supports with IntelliSense which provides active hints as the code is added.
### Chakra-UI
Chakra UI provides a lot of components, improved styling API, accessibility, and intuitive component APIs.
Comes with a very intuitive, CSS-like, and prop based model of styling components, making it easy to learn. The components name and prop names are also very easy to understand.
Chakra is not tied down by any design systems and offers much freedom with customizing the components to implement your own design.
### Craco
Get all the benefits of create-react-app and customization without using 'eject' by adding a single craco.config.js file at the root of your application and customize your eslint, babel, postcss configurations and many more.

All you have to do is create your app using create-react-app and customize the configuration with a craco.config.js file.

### The WebSocket API (WebSockets)
Full-duplex asynchronous messaging. In other words, both the client and the server can stream messages to each other independently.
WebSockets generally do not use XMLHttpRequest, and as such, headers are not sent every-time we need to get more information from the server. This, in turn, reduces the expensive data loads being sent to the server.
WebSockets pass through most firewalls without any reconfiguration.
Good security model.
### Husky
You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.
Zero dependencies and lightweight (6 kB).
Powered by modern new Git feature (core.hooksPath).
Follows npm and Yarn best practices regarding autoinstall.
User-friendly messages.
Optional install.
### Eslint
ESLint statically analyzes your code to quickly find problems. ESLint is built into most text editors and you can run ESLint as part of your continuous integration pipeline.
Many problems ESLint finds can be automatically fixed. ESLint fixes are syntax-aware so you won't experience errors introduced by traditional find-and-replace algorithms.
Preprocess code, use custom parsers, and write your own rules that work alongside ESLint's built-in rules. You can customize ESLint to work exactly the way you need it for your project.
### Prettier
Prettier plugin makes the process of code formatting instant, non-intrusive and almost invisible. Prettier can be set to format before commit or run manually, or format on save. It makes it a seamless experience and it’s nice to be able to have a cramped react component break into a well-formatted block when you start adding some more props. The great thing about Prettier is it can be integrated into existing workflows, it can even work alongside of ESLint.
### Dompurify
DOMPurify sanitizes HTML and prevents XSS attacks. You can feed DOMPurify with string full of dirty HTML and it will return a string (unless configured otherwise) with clean HTML. DOMPurify will strip out everything that contains dangerous HTML and thereby prevent XSS attacks and other nastiness. It's also damn bloody fast. We use the technologies the browser provides and turn them into an XSS filter. The faster your browser, the faster DOMPurify will be.
DOMPurify is written by security people who have vast background in web attacks and XSS.
### Jest
Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly.
Jest is well-documented, requires little configuration and can be extended to match your requirements.
### React-beautiful-dnd
-  #### Pros:  
Easy to use and configurate.  
Mobile devices support.  
No creation of additional wrapper dom nodes - flexbox and focus management friendly.  
-  #### Cons:  
Narrow specialization - for lists only.

There are a lot of libraries out there that allow for drag and drop interactions within React.
react-beautiful-dnd is a higher level abstraction specifically built for lists (vertical, horizontal, movement between lists, nested lists and so on). Within that subset of functionality react-beautiful-dnd offers a powerful, natural and beautiful drag and drop experience.

### React-rnd
React-rnd does an incredible job at providing a great set of drag and drop primitives which work especially well with the wildly inconsistent html5 drag and drop feature.
It is a set of utilities to help you build complex drag and drop interfaces while keeping your components decoupled.
### React Slick
-  #### Pros:  
Flexible choices for adaptive layout.  
Mobile devices support.   
-  #### Cons:  
Create additional wrappers, which can be problem when using flexbox. 

### SheetJS(xlsx)
The library supports many formats. It makes it quite easy to import and export JS objects. And all of this functionality on the client side!


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [React]: <https://reactjs.org/>
   [Redux-toolkit]: <https://github.com/reduxjs/redux-toolkit/>
   [React-Redux]: <https://react-redux.js.org/>
   [Craco]: <https://github.com/gsoft-inc/craco/>
   [TypeScript]: <https://www.typescriptlang.org/>
   [Chakra-UI]: <https://chakra-ui.com/>
   [Create-React-App]: <https://github.com/facebook/create-react-app/>
   [WebSockets]: <https://www.npmjs.com/package/ws>
   [Husky]: <https://typicode.github.io/husky/#/>
   [Eslint]: <https://eslint.org/>
   [Prettier]: <https://prettier.io/>
   [Dompurify]: <https://www.npmjs.com/package/dompurify>
   [Jest]: <https://jestjs.io/>
   [React-beautiful-dnd]: <https://www.npmjs.com/package/react-beautiful-dnd>
   [React-rnd]: <https://www.npmjs.com/package/react-rnd>
   [React-slick]: <https://react-slick.neostack.com/>
   [SheetJS]: <https://www.npmjs.com/package/xlsx>


## build instructions (WIP)

For gh-pages build:
  1. Set homepage in client/package.json = url of gh-pages, when index html will be exist.
    for example - if repo https://mygithubname.github.io/myawesomerepo then 
      "homepage": "https://mygithubname.github.io/myawesomerepo"
      OR (not tested)
      "homepage": "./myawesomerepo"
  2. Change the script in client/package.json "build:gh-pages" - change BASENAME according to step 1.
  3. Build with npm run build:gh-pages
  4. Move files from the build to another folder
  5. Do git things in this another folder

For netlify (not tested):
  1. delete homepage from client/package.json
  2. build with npm run build?
  3. Do netlify thingsititit
