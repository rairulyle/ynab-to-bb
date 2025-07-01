import fs from 'fs';

const INPUT_FILE = 'Monthly Budget as of 2025-07-01 15-36 - Register.csv'; // The YNAB register csv file.
const OUTPUT_DIR = 'output';
const RECORDS_PER_FILE = 90; // We only put 90 per file to cater BB limitation

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

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
  const filename = `(${i}) Monthly Budget.csv`;
  const filePath = `${OUTPUT_DIR}/${filename}`;
  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`Created: ${filePath}`);
}

console.log(`Done! Split into ${totalFiles} files in '${OUTPUT_DIR}' folder.`); 
