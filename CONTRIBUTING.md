# Contributing Guidelines

Thank you for contributing to the **IGF115-2016** educational platform! To maintain code quality and consistency, please follow the guidelines below.

## Code Style & Standards

- **TypeScript & React**: We use modern React (v19) and strict TypeScript. Ensure proper typing for all new components and hooks.
- **Styling**: We use Tailwind CSS. Maintain consistency with the defined design tokens in `app/globals.css`.
- **Prettier & ESLint**: Ensure that your code is formatted properly and runs without warnings or lint errors.

## Git Workflow & Branches

1. Fork the repository and create your branch from `main`.
2. Keep branches small and focused on a single issue or feature.
3. Open a Pull Request (PR) against the `main` branch.

## Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for all commit messages. This allows for automated changelogs and clean history.

The commit message format is:

```
<type>(<scope>): <description>

[optional body]
```

### Common Types:
- `feat`: A new feature (e.g., `feat(visualizer): add stack pop animation`).
- `fix`: A bug fix (e.g., `fix(editor): resolve execution error in python templates`).
- `docs`: Documentation changes (e.g., `docs(readme): update deployment instructions`).
- `style`: Changes that do not affect the meaning of the code (whitespace, formatting, missing semi-colons).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `chore`: Updating build tasks, package manager configs, etc. (e.g., `chore(deps): update monaco-editor`).

### Example Commit Message:
```
feat(editor): implement monaco editor with interactive JavaScript execution console
```

Thank you for helping us improve software engineering education!
