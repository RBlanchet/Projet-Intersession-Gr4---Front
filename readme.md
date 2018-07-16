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

## Production build

TODO