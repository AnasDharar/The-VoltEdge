# Contributing to The VoltEdge

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to The VoltEdge. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Types of Contributions We're Looking For

We welcome all kinds of contributions, but we are specifically looking for help with:

- **UI/UX Improvements**: Enhancements to the user interface, styling fixes, accessibility improvements, and general polish to make the application look and feel better.
- **Tool Logic Fixes**: Bug fixes or performance improvements for the existing calculator tools (e.g., K-Map Solver, Base Converter) to ensure accuracy and reliability.
- **New Features**: Adding new digital logic tools, simulators, or educational content to expand the platform's capabilities.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for The VoltEdge. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps to reproduce the problem** in as much detail as possible.
- **Provide specific examples** to demonstrate the steps.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead** and why.
- **Include screenshots** if the problem is visual (UI/UX).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for The VoltEdge, including completely new features and minor improvements to existing functionality.

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
- **Explain why this enhancement would be useful** to most users.

### Pull Requests

The process is straightforward:

1.  **Fork** the repo on GitHub.
2.  **Clone** the project to your own machine.
3.  **Create a branch** for your work.
    *   `git checkout -b feature/AmazingFeature`
    *   `git checkout -b fix/BugName`
4.  **Make your changes** and commit them.
    *   `git commit -m 'Add some AmazingFeature'`
    *   Try to keep your commits small and focused.
5.  **Push** to your branch.
    *   `git push origin feature/AmazingFeature`
6.  **Submit a Pull Request** to the `main` branch.

## Development Setup

To set up your local development environment:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/The-VoltEdge.git
    ```
2.  **Navigate to the frontend directory**:
    ```bash
    cd The-VoltEdge/frontend
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.
- Reference issues and pull requests liberally after the first line.

### JavaScript/React Styleguide

- We use **ESLint** to enforce code style.
- Make sure to run `npm run lint` before committing to ensure your code follows the project's standards.
- Use functional components and Hooks for React.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
