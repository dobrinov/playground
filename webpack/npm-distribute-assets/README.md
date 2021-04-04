# Distributing static assets as part of an NPM package

## The problem
I am working on a design library NPM package and I am exploring the different options to distribute static assets as part of such.

The problem is that Webpack resolves CSS urls based on the file which will produce output in the dist directory. I this case this is the file `src/assets/application.scss` and as you can see `shrug.png` is linked relatively to it.

This works just fine but I would like to use an NPM package (developed by me) which provides my host application with SASS mixins and some assets. The problem happens when I try to build my host application because it tries to link the NPM package assets relatively to to `src/assets/application.scss`.

## Solutions

### URL rewriting
One thing which could be done here is to use a Webpack loader like [resolve-url-loader](https://github.com/bholloway/resolve-url-loader) to rewrite all urls. This will make the url paths relative to the file which contains the url instead of `src/assets/application.scss`.

### SASS variables
Something which older versions of [Bootstrap](https://getbootstrap.com/) to is to use [SASS variables](https://github.com/twbs/bootstrap-sass/blob/b34765d8a6aa775816c59012b2d6b30c4c66a8e9/assets/stylesheets/bootstrap/_variables.scss#L83) for the static assets path which could be overriden by the host application. Unfortunately I do not think that this is a good option anymore because you will have to use SASS `@import` instead of `@use`, which is discouraged because it puts everything in the global namespace.

### Inline assets
[Bootstrap 5](https://getbootstrap.com/) does something else to solve this. It [inlines the static assets](https://github.com/twbs/bootstrap/blob/f6694b74405261ed454d409ea5251f08cdf6c51c/scss/_variables.scss#L540).

## Setup

1. Go to the `distributable` package directory.
2. `yarn link`
3. Go to the `host` application directory.
4. `yarn link distributable`
5. `yarn install`
6. `yarn webpack`

The result will be the following error:
```
    ERROR in ./src/assets/application.scss (./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/application.scss)
    Module not found: Error: Can't resolve './images/shrug.png' in '.host/src/assets'
     @ ./src/assets/application.scss (./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/assets/application.scss) 5:36-65
```

If you comment the inclusion of the `foo` mixin in `src/assets/application.scss` the build will be successful.
