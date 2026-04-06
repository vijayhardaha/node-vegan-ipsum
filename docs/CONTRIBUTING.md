# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/node-vegan-ipsum.git`
3. Install dependencies: `pnpm install`

## Development

```bash
pnpm build          # Build the project
pnpm test           # Run tests
pnpm lint           # Lint code
pnpm tsc            # Type-check
```

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run checks: `pnpm tsc && pnpm lint && pnpm test`
4. Commit with clear messages
5. Push and open a PR

## Code Standards

- TypeScript strict mode
- Use ESLint and Prettier
- Add tests for new features
- Update documentation

## Reporting Issues

Use GitHub Issues to report bugs or request features.
