# Project Title
Beer Punk

## React + TypeScript + Vite

This project leverages Vite for a fast development setup, React for building user interfaces, and TypeScript for adding type safety to JavaScript. It provides a minimal setup to get React working seamlessly in Vite with Hot Module Replacement (HMR), alongside ESLint for code quality.

![Vite Badge](https://img.shields.io/badge/vite-^2.0.0-blue.svg)
![React Badge](https://img.shields.io/badge/react-^17.0.0-blue.svg)
![TypeScript Badge](https://img.shields.io/badge/typescript-^4.0.0-blue.svg)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Features

- Fast Refresh with [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) (Babel) and [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) (SWC).
- Enhanced ESLint configuration for production-level type safety.
- Integration with the Punk API for data fetching.
- Metamask authentication for a secure login experience.
- Redux for state management, Axios for HTTP requests, and React Router for navigation.
- 
#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
