# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/node-vegan-ipsum.git`
3. Install dependencies: `bun install`

## Development

```bash
bun run build       # Build the project
bun run test        # Run tests
bun run lint        # Lint code
bun run tsc         # Type-check
```

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run checks: `bun run tsc && bun run lint && bun run test`
4. Commit with clear messages
5. Push and open a PR

## Code Standards

- TypeScript strict mode
- Use ESLint and Prettier
- Add tests for new features
- Update documentation

## Reporting Issues

Use GitHub Issues to report bugs or request features.
