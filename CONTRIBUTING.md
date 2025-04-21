# Contributing with the repository

The Seed a Bit UI library is designed to be a flexible and extensible component library for building user interfaces. This document outlines the guidelines for contributing to the repository, including how to set up your development environment, add new components, and submit changes.

## Getting Started

For new contributors, follow these steps to set up your development environment:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/seedabit/ui-components.git
    cd ui-components
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **If you are using a specific component**:
    - Make sure to install the dependencies for that component as well. Each component has its own `package.json` file, so navigate to the component's directory and run:
    ```bash
    cd src/component-name
    npm install
    ```

## Adding a New Component

Each component is located inside its own directory under the `src/` folder. Each component should have its own directory with the following structure:

```bash
src/
    └── component-name
        ├── directory-name
        │   ├── component-name.tsx
        ├── package.json
        ├── tsconfig.json
        ├── <other needed directories and files>
        └── README.md
```

The CLI accesses the components through the `src/` directory. Each component should have its own `package.json` file to manage dependencies and scripts specific to that component, as well as a `tsconfig.json` file for TypeScript configuration for the global paths used in imports (the component only works with @ alias imports if the `tsconfig.json` file is configured correctly INSIDE the component's directory).

```json
"baseUrl": "./",
    "paths": {
        "@/*": ["./*"],
    }
```

The component's directories will be reflected in the final user project structure, so it's important to maintain a clean and organized structure; following the defined paterns and directory structure.

The project is built using TypeScript and React, so make sure you have a basic understanding of these technologies. It's also recommended to familiarize yourself with the [Tailwind CSS](https://tailwindcss.com/) framework, as it is used for styling the components.
