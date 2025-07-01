import fs from 'fs';

const INPUT_FILE = process.argv[2];
const OUTPUT_DIR = process.argv[3] || 'output';
const RECORDS_PER_FILE = 500;

if (!INPUT_FILE) {
  console.error('Error: Input file is required.');
  console.log('Usage: node split_transactions.js <input_file> [output_dir]');
  process.exit(1);
}

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// Read the CSV file
const csvData = fs.readFileSync(INPUT_FILE, 'utf8');
const lines = csvData.split(/\r?\n/);
const header = lines[0];
const records = lines.slice(1).filter(line => line.trim() !== '');

const totalFiles = Math.ceil(records.length / RECORDS_PER_FILE);

for (let i = 0; i < totalFiles; i++) {
  const startIdx = i * RECORDS_PER_FILE;
  const endIdx = startIdx + RECORDS_PER_FILE;
  const chunk = records.slice(startIdx, endIdx);
  const output = [header, ...chunk].join('\n');
  const filename = `(${i+1}) Monthly Budget.csv`;
  const filePath = `${OUTPUT_DIR}/${filename}`;
  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`Created: ${filePath}`);
}

console.log(`Done! Split into ${totalFiles} files in '${OUTPUT_DIR}' folder.`); 
