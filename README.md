<div align="center">
  <img src="https://user-images.githubusercontent.com/522079/158864859-0fbeae62-9d7a-4619-b35e-f8fa5f68e0c8.png" alt="Magator Logo" width="320">
  <h1>directutils</h1>
  <strong>Utility for directus extensions
👩🏽‍💻</strong>
  <h6>Made with ❤️ &nbsp;by developers for developers</h6>
</div>
<br>

Welcome to the Directus Extension Utility <b>directus</b>. Your NPM package solution for streamlined Directus extension development!

Are you tired of the hassles that come with creating and maintaining Directus extensions? Look no further, as our utility is here to make your life easier. This comprehensive NPM package addresses two crucial challenges developers often face in the Directus ecosystem.

- Automated Code Migration: Say goodbye to manual code copying! Our utility simplifies the process by automatically copying generated code from your dist/index.js file to your Directus repository. This time-saving feature eliminates tedious, error-prone tasks, allowing you to focus on your extension's core functionality.

- Seamless Directus API Access: Your Directus extension deserves the power to interact with the Directus API effortlessly. Our utility equips you with a rich set of functions, enabling you to make API calls from your extension with ease. Whether you need to fetch data, create content, or manage users, we've got you covered.

Simplify your Directus extension development workflow today with our user-friendly utility. Say hello to enhanced productivity and reduced development headaches. Get started now and experience the difference!"

# Installation

```bash
npm install directutils
```

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
