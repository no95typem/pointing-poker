For gh-pages build:
  1. Set homepage in client/package.json = url of gh-pages, when index html will be exist.
    for example - if repo https://mygithubname.github.io/myawesomerepo then 
      "homepage": "https://mygithubname.github.io/myawesomerepo"
      OR (not tested)
      "homepage": "./myawesomerepo"
  2. Build with npm run build:gh-pages
  3. Move files from the build to another folder
  4. Do git things in this another folder

For netlify (not tested):
  1. delete homepage from client/package.json
  2. build with npm run build?
  3. Do netlify things