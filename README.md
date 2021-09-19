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