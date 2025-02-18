# node-auto-fit

# Description

This script can automatically switch the Node.js version in the dev environment,eliminating the need for manual switching with nvm.

# Installation
```bash
npm i node-auto-fit -D
```

# Usage
## Create the .nvmrc file:
In the root directory of the project, create a file named .nvmrc and write the desired Node.js version in it, for example 18.0.0.

```bash
echo "18.0.0" > .nvmrc
```

## Edit the package.json file:
Find the package.json file and add the serve command in the scripts object like this:
```json
"scripts": {
    "preinstall": "node-auto-fit",
    "start": "node-auto-fit && vite",
    "build": "node-auto-fit && vite build",
  },
```

## Final File Structure Example:
- Root Directory
  - .nvmrc
  - package.json

Contents of the .nvmrc file:
```json
18.0.0
```
Example part of the package.json file:
```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "scripts": {
    "preinstall": "node-auto-fit",
    "start": "node-auto-fit && vite",
    "build": "node-auto-fit && vite build",
  },
  "dependencies": {
    // dependencies...
  }
}
```
After completing these steps, both the .nvmrc and package.json will be correctly configured, allowing you to use nvm to manage the Node.js version and run scripts.