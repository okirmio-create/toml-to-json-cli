# toml-to-json-cli

Convert TOML files to JSON and JSON to TOML from the command line.

## Installation

```bash
npm install -g toml-to-json-cli
```

## Usage

### TOML to JSON

```bash
# From file
toml-to-json-cli toml2json -i config.toml

# From file to file
toml-to-json-cli toml2json -i config.toml -o config.json

# From stdin
cat config.toml | toml-to-json-cli toml2json

# Compact output (no pretty printing)
toml-to-json-cli toml2json -i config.toml --no-pretty

# Custom indentation
toml-to-json-cli toml2json -i config.toml --indent 4
```

### JSON to TOML

```bash
# From file
toml-to-json-cli json2toml -i config.json

# From file to file
toml-to-json-cli json2toml -i config.json -o config.toml

# From stdin
cat config.json | toml-to-json-cli json2toml
```

## Options

### toml2json

| Option | Description | Default |
|---|---|---|
| `-i, --input <file>` | Input TOML file | stdin |
| `-o, --output <file>` | Output JSON file | stdout |
| `--pretty` | Pretty print JSON | `true` |
| `--no-pretty` | Disable pretty printing | |
| `--indent <number>` | Indentation size | `2` |

### json2toml

| Option | Description | Default |
|---|---|---|
| `-i, --input <file>` | Input JSON file | stdin |
| `-o, --output <file>` | Output TOML file | stdout |

## License

MIT
