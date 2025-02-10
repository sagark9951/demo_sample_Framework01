// import fs from 'fs';

// // Reading JSON Data
// function readJSON(filePath) {
//     const rawData = fs.readFileSync(filePath); // Reading file content
//     const data = JSON.parse(rawData); // Parsing the JSON content
//     return data;
// }

// // Writing Data to JSON
// function writeJSON(data, filePath) {
//     const jsonData = JSON.stringify(data, null, 2); // Convert object to JSON string with indentation
//     fs.writeFileSync(filePath, jsonData); // Writing JSON to file
// }

// // Example Usage
// const jsonData = readJSON('path/to/json/file.json');
// console.log(jsonData); // Prints the JSON data from the file

// const newData = {
//     name: 'Alice',
//     age: 28,
//     city: 'London'
// };

// writeJSON(newData, 'path/to/output/json/file.json');


import fs from 'fs';
import path from 'path';

/**
 * Function to get data from a specified JSON file.
 * @param {string} fileName - The name of the JSON file (e.g., 'userCredentials.json').
 * @param {string} key - The key to search for in the JSON file.
 * @returns {object|string} - The value corresponding to the key, or an error message.
 */
export function getData(fileName, key) {
    const filePath = path.join(process.cwd(), fileName);

    try {
        // Read and parse the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Check if the key exists in the data
        if (data.hasOwnProperty(key)) {
            return data[key];
        } else {
            return `No data found for key: ${key}`;
        }
    } catch (error) {
        return `Error reading the JSON file: ${error.message}`;
    }
}
