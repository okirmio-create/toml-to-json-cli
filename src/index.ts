import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'node:fs';
import TOML from '@iarna/toml';

const program = new Command();

function readInput(inputPath: string | undefined): string {
  if (inputPath) {
    try {
      return readFileSync(inputPath, 'utf-8');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red(`Error reading file: ${message}`));
      process.exit(1);
    }
  }

  if (!process.stdin.isTTY) {
    try {
      return readFileSync(0, 'utf-8');
    } catch {
      console.error(chalk.red('Error reading from stdin'));
      process.exit(1);
    }
  }

  console.error(chalk.red('No input provided. Use -i <file> or pipe via stdin.'));
  process.exit(1);
}

function writeOutput(data: string, outputPath: string | undefined): void {
  if (outputPath) {
    try {
      writeFileSync(outputPath, data, 'utf-8');
      console.error(chalk.green(`Written to ${outputPath}`));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red(`Error writing file: ${message}`));
      process.exit(1);
    }
  } else {
    process.stdout.write(data);
  }
}

program
  .name('toml-to-json-cli')
  .description('Convert TOML files to JSON and JSON to TOML')
  .version('1.0.0');

program
  .command('toml2json')
  .description('Convert TOML to JSON')
  .option('-i, --input <file>', 'Input TOML file')
  .option('-o, --output <file>', 'Output JSON file (default: stdout)')
  .option('--pretty', 'Pretty print JSON', true)
  .option('--no-pretty', 'Disable pretty printing')
  .option('--indent <number>', 'Indentation size', '2')
  .action((options) => {
    try {
      const input = readInput(options.input);
      const parsed = TOML.parse(input);
      const indent = options.pretty ? Number(options.indent) : undefined;
      const json = JSON.stringify(parsed, null, indent) + '\n';
      writeOutput(json, options.output);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red(`TOML parse error: ${message}`));
      process.exit(1);
    }
  });

program
  .command('json2toml')
  .description('Convert JSON to TOML')
  .option('-i, --input <file>', 'Input JSON file')
  .option('-o, --output <file>', 'Output TOML file (default: stdout)')
  .action((options) => {
    try {
      const input = readInput(options.input);
      const parsed = JSON.parse(input);
      const toml = TOML.stringify(parsed);
      writeOutput(toml, options.output);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red(`JSON parse error: ${message}`));
      process.exit(1);
    }
  });

program.parse();
