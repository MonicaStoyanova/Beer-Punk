# Beer Punk
Authentication is possible with MetaMask wallet

To start the project:
For local execution, use npm install and npm run dev.

## React + TypeScript + Vite

This project leverages Vite for a fast development setup, React for building user interfaces, and TypeScript for adding type safety to JavaScript. It provides a minimal setup to get React working seamlessly in Vite with Hot Module Replacement (HMR), alongside ESLint for code quality.

![Vite Badge](https://img.shields.io/badge/vite-5.0.8-blue.svg)
![React Badge](https://img.shields.io/badge/react-18.2.0-blue.svg)
![TypeScript Badge](https://img.shields.io/badge/typescript-5.2.0-blue.svg)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Features

- Fast Refresh with [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) (Babel) and [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) (SWC).
- Enhanced ESLint configuration for production-level type safety.
- Integration with the Punk API for data fetching.
- Metamask authentication for a secure login experience. ![Static Badge](https://img.shields.io/badge/Metamask-blue.svg)
- Redux for state management, Axios for HTTP requests, and React Router for navigation. ![Static Badge](https://img.shields.io/badge/Redux-blue.svg) ![Static Badge](https://img.shields.io/badge/Axios-blue.svg) ![Static Badge](https://img.shields.io/badge/React%20Router-blue.svg)

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
