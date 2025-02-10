import XLSX from 'xlsx';
import fs from 'fs';

// Reading Excel Data
function readExcel(filePath) {
    const file = XLSX.readFile(filePath);
    const sheetName = file.SheetNames[0]; // Accessing the first sheet
    const sheet = file.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet); // Converting the sheet to JSON
    return data;
}

// Writing Data to Excel
function writeExcel(data, filePath) {
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON data to worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, filePath); // Write to file
}

// Example Usage
const excelData = readExcel('path/to/excel/file.xlsx');
console.log(excelData); // Prints the data from the Excel file

const newData = [
    { name: 'John Doe', age: 30, city: 'New York' },
    { name: 'Jane Doe', age: 25, city: 'Los Angeles' }
];

writeExcel(newData, 'path/to/output/excel/file.xlsx');
