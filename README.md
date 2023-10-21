<div align="center">
  <img src="https://user-images.githubusercontent.com/522079/158864859-0fbeae62-9d7a-4619-b35e-f8fa5f68e0c8.png" alt="Magator Logo" width="320">
  <h1>directutils</h1>
  <strong>Utility for directus extensions
👩🏽‍💻</strong>
  <h6>Made with ❤️ &nbsp;by developers for developers</h6>
</div>
<br>

A npm package that serves as utlity for directus extensions. This utility try to solve two major issue that comes while developing directus extension, One is automatic copying of generated code from `dist/index.js` file to directus repo. And other thing is it contains all the function if you want to call directus API from extension.

# Installation

`npm install directutils`

# Example

#### Use it as file change listner

Replace the below command with `"dev"` script in generated `package.json` file of extension

```json
{
  "scripts": {
    "dev": "concurrently \"directutils gossip <project-name> <extension-type> <extension-name>\" \"directus-extension build -w --no-minify\""
  }
}
```

Be make sure replace these in above command

- `<project-name>` name of the directus repo
- `<extension-type>` type of the extension like hooks, endpoints, etc
- `<extension-name>` name of the extension

## Environment variable expected by this package

```bash
STATIC_ACCESS_TOKEN="directus-static-access-token"
MODE="dev-or-pro"
ENVIRONMENT="local-or-remote"
DIRECTUS_REMOTE_BASE_URL="directus-remote-url"
DIRECTUS_LOCAL_BASE_URL="http://127.0.0.1:3000"
```
