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
  3. Do netlify things

## Technology stack

| Technology | Short description | Full description |
| ------ | ------ | ------ |
| [React][React] | A free and open-source front-end JavaScript library for building user interfaces or UI components | [More details](#React) |
| [Redux][Redux] | An open-source JavaScript library for managing and centralizing application state | [More details](#Redux) |
| [TypeScript][TypeScript] | A strongly typed programming language which builds on JavaScript giving you better tooling at any scale. | [More details](#TypeScript) |
| [Chakra-UI][Chakra-UI] | A simple, modular and accessible component library that gives you the building blocks you need to build your React applications | [More details](#Chakra-UI) |
| [Webpack][Webpack] | A static module bundler for modern JavaScript applications | [More details](#Webpack) |
| [WebSockets][WebSockets] | An advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server | [More details](#the-websocket-api-websockets) |
| [Husky][Husky] | A tool that allows us to easily wrangle Git hooks and run the scripts we want at those stages | [More details](#Husky)
| [Eslint][Eslint] | A static code analysis tool for identifying problematic patterns found in JavaScript code | [More details](#Eslint)
| [Prettier][Prettier] | An opinionated code formatter | [More details](#Prettier)
| [Dompurify][Dompurify] | A DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG | [More details](#Dompurify)
| [Jest][Jest] | A JavaScript Testing Framework with a focus on simplicity | [More details](#Jest)
| [Framer Motion][Framer Motion] | An open source and production-ready motion library for React on the web | [More details](#Framer-Motion)
| [React-beautiful-dnd][React-beautiful-dnd] | Assists to create beautiful drag and drop for lists with React |[More details](#React-beautiful-dnd)
| [React-rnd][React-rnd] | Allows you to create a resizable and drag-and-drop React component | [More details](#React-rnd)
| [React Slick][React-slick] | A carousel component built with React | [More details](#React-slick)
| [Slick-carousel][Slick-carousel] | `А эта карусель применялась?` | [More details](#Slick-carousel)
| [Web Vitals][Web Vitals] | A modular library for measuring all the Web Vitals metrics on real users | [More details](#Web-Vitals)
| [SheetJS (xlsx)][SheetJS] | Parser and writer for various spreadsheet formats | [More details](#SheetJSxlsx)


### React
### Redux
### TypeScript
### Chakra-UI
### Webpack
### The WebSocket API (WebSockets)
### Husky
### Eslint
### Prettier
### Dompurify
### Jest
### Framer Motion
### React-beautiful-dnd
### React-rnd
### React Slick
### Slick-carousel
### Web Vitals
### SheetJS(xlsx)


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [React]: <https://reactjs.org/>
   [Redux]: <https://redux.js.org/>
   [TypeScript]: <https://www.typescriptlang.org/>
   [Chakra-UI]: <https://chakra-ui.com/>
   [Webpack]: <https://webpack.js.org/>
   [WebSockets]: <https://www.npmjs.com/package/ws>
   [Husky]: <https://typicode.github.io/husky/#/>
   [Eslint]: <https://www.npmjs.com/package/eslint>
   [Prettier]: <https://prettier.io/>
   [Dompurify]: <https://www.npmjs.com/package/dompurify>
   [Jest]: <https://jestjs.io/>
   [Framer Motion]: <https://www.npmjs.com/package/framer-motion>
   [React-beautiful-dnd]: <https://www.npmjs.com/package/react-beautiful-dnd>
   [React-rnd]: <https://www.npmjs.com/package/react-rnd>
   [React-slick]: <https://react-slick.neostack.com/>
   [Slick-carousel]: <https://www.npmjs.com/package/slick-carousel>
   [Web Vitals]: <https://www.npmjs.com/package/web-vitals>
   [SheetJS]: <https://www.npmjs.com/package/xlsx>
