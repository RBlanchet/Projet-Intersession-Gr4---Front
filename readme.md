# Groupe 4

## Setup

- Update node: https://nodejs.org/en/download/

- (if needed) install homebrew: ``` /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" ```

- Then yarn : ``` brew install yarn ```

- ``` yarn install ```

## Compiling statics

For developpement: 
- ``` yarn dev ``` (the file watcher is included)

For production: 
-  ``` yarn build ```

### Code location

The code for static is in /source directory, compiled code by webpack goes in /dist.

## Launching the app

- ``` yarn start ```

- To gain access to the react dev tools, paste this in the dev console: 
``` require('electron-react-devtools').install() ```

## Production build

TODO

## General info

### user Info:

on register:
```
{
   "lastname" : "Romain",
   "firstname": "Blanchet",
   "email": "r.blanchet@it-akademy.fr",
   "plainPassword": "1234"
} 
```