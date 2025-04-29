// Fetch the CSV file and populate the dropdowns
let csvData = []; // This will hold the parsed CSV data

async function populateDropdownsFromCSV() {
    const dropdown1 = document.getElementById('dropdown1');
    const dropdown2 = document.getElementById('dropdown2');
    try {
        const response = await fetch('pricelist.csv');
        const csvText = await response.text();
        const rows = csvText.split('\n').map(row => row.trim());
        
        // Clear existing options in both dropdowns
        dropdown1.innerHTML = '';
        dropdown2.innerHTML = '';

        // Parse CSV and populate dropdowns
        csvData = rows.map(row => row.split(';')); // Convert each row into an array of columns
        const uniqueColumn1 = new Set();
        const uniqueColumn2 = new Set();

        csvData.forEach(columns => {
            if (columns.length > 0 && columns[0]) {
                uniqueColumn1.add(columns[0]); // Add unique values from first column
            }
            if (columns.length > 1 && columns[1]) {
                uniqueColumn2.add(columns[1]); // Add unique values from second column
            }
        });

        // Populate dropdown1 with unique values from column 1
        uniqueColumn1.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            dropdown1.appendChild(option);
        });

        // Populate dropdown2 with unique values from column 2
        uniqueColumn2.forEach(value => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            dropdown2.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading CSV file:', error);
        dropdown1.innerHTML = '<option value="">Error loading options</option>';
        dropdown2.innerHTML = '<option value="">Error loading options</option>';
    }
}

// Get references to the form elements
const textInput = document.getElementById('textInput');
const dropdown1 = document.getElementById('dropdown1');
const dropdown2 = document.getElementById('dropdown2');
const dynamicLabel = document.getElementById('dynamicLabel');

// Function to update the label dynamically
function updateLabel() {
    const text = parseFloat(textInput.value) || 0; // Convert input text to an integer
    const option1 = dropdown1.value || "None";
    const option2 = dropdown2.value || "None";

    // Find the matching row in the CSV data
    matchingRow = csvData.find(columns => columns[0] === option1 && columns[1] === option2);

    let thirdColumnValue = 0; // Default value if no match
    if (matchingRow && matchingRow.length > 2) {
        thirdColumnValue = parseFloat(matchingRow[2]); // Convert the third column to a float
        thirdColumnValue = thirdColumnValue - 0.01; // One cent less as per Astrid request
    }

    result = text * thirdColumnValue ; // Multiply the text input by the third column value

    if (result == 0) {
        dynamicLabel.textContent = `(Error: Cannot find in pricelist)`;
    } else if (result <= 45) {
        dynamicLabel.textContent = `Estimated cost: 45€ (Minimum charge)`;
    } else {
        dynamicLabel.textContent = `Estimated cost: ${result}€`;

    }



}

// Attach event listeners to form elements
textInput.addEventListener('input', updateLabel);
dropdown1.addEventListener('change', updateLabel);
dropdown2.addEventListener('change', updateLabel);

// Populate the dropdowns on page load
populateDropdownsFromCSV();