## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build:{mode}
```

Modes:

- dev
- prod
- staging

## Deployment

### Useful commands

Start format code before push:

```bash
yarn lint
```

```bash
npm run lint
```

Start generate code:
With npm

```bash
npm run codegen
```

```bash
npm run typegen
```

With yarn

```bash
yarn codegen
```

```bash
npm run typegen
```

### Git workflow & conventions

#### 1. Commit message

We use [gitmoji](https://gitmoji.dev/) to make our commit messages more readable.
Every commit message should follow this format:

- message: A brief explanation of the change.

Example:

```
{issue}
```

#### 2. Branch name

Branch names should follow this format:

```
📝{document}/-Update-README
```
