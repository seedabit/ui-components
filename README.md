# seed-a-bit/ui

This repository contains the source code for the Seed a Bit UI, a collection of React and TypeScript-based ready-to-use UI components. These components are designed to work seamlessly with the company ecosystem and are built with reusability, customization, and developer experience in mind.

## Features

- **React & TypeScript**: All components are built using React and TypeScript, ensuring type safety and modern development practices.
- **Customizable**: Components are designed to be easily customizable to fit various project requirements.
- **Tailwind CSS**: Styled using Tailwind CSS for a consistent and modern design system.
- **CLI Integration**: The components in this repository are integrated with the Seed a Bit CLI, which simplifies the process of importing and using them in projects.
- **Inspired by shadcn**: Similar to the Shadcn components, this library provides a robust and flexible foundation for building UI elements with ease.
- **Accessibility First**: All components are built with accessibility (a11y) in mind, ensuring they are usable by everyone.
- **Lightweight & Performant**: Designed to be lightweight and optimized for performance, ensuring fast load times and smooth user experiences.

## Usage

The components in this repository are not meant to be used directly. Instead, they are managed and imported into projects using the company's CLI tool. The CLI handles the setup, configuration, and integration of these components into your project.

### Getting Started

1. **Install the CLI**: Ensure you are using the Seed a Bit CLI, the command-line interface for managing your projects. You can run it using `npx`:
   ```bash
   npx @seed-a-bit/cli
   ```
2. **Import Components**: Use the CLI to import the desired components into your project. For example:
   ```bash
   npx @seed-a-bit/cli add <component-name>
   ```
3. **Customize Components**: Once imported, you can customize the components as needed to fit your project requirements. Refer to the [documentation](https://guia.seedabit.org.br/cli/introduction) for each component for details on customization options.

### Example Workflow

Here’s an example of how you might use the CLI to add a component to your project:

1. Run the following command to add a button component:
   ```bash
   npx @seed-a-bit/cli add button
   ```

2. The CLI will automatically set up the component in your project, including any necessary dependencies, configurations and correct directories.

3. Import and use the component in your code:
   ```tsx
   import { Button } from '@/components/seed-a-bit/button'

   export default function Example() {
     return <Button variant="primary">Click Me</Button>
   }
   ```

## Available Components

The repository includes a growing list of components, such as:

- Auth Context Provider
- Many more components...

Refer to the [documentation](https://guia.seedabit.org.br/cli/introduction) for a full list of available components and their usage.

## Contributing

All contributions must adhere to the defined rules and guidelines, if you’d like to contribute, please follow our [contribution guidelines](CONTRIBUTING.md). Whether it’s fixing bugs, adding new features, or improving documentation, your help is appreciated.

## License

This project is licensed under our [License](LICENSE).

## Acknowledgments

This library is inspired by the [shadcn/ui](https://github.com/shadcn/ui) components and aims to provide a similar level of flexibility and ease of use while being tailored to the Seed a Bit ecosystem.