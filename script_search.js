// Fetch records from the server
async function fetchRecords() {
    try {
        const response = await fetch('/fetchRecords');
        if (!response.ok) {
            throw new Error('Failed to fetch records');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
}

// Function to dynamically generate HTML for table headers
function generateTableHeaders(fields, tableHeaderId) {
    const headersHTML = fields.map(field => `<th>${field}</th>`).join('');
    const tableHeader = document.getElementById(tableHeaderId);
    if (tableHeader) {
        tableHeader.innerHTML = headersHTML;
    } else {
        console.error(`Table header element with ID "${tableHeaderId}" not found.`);
    }
}

// Function to dynamically generate HTML for each record row
function generateRecordRow(record, fields) {
    return `<tr>${fields.map(field => `<td>${record[field] || ''}</td>`).join('')}</tr>`;
}

// Function to display records in a table
async function displayRecords(records, tableHeaderId, recordsContainerId) {
    const recordsContainer = document.getElementById(recordsContainerId);
    if (!recordsContainer) {
        console.error(`Records container element with ID "${recordsContainerId}" not found.`);
        return;
    }

    // Collect all fields from records excluding _id
    const allFields = records.reduce((fields, record) => fields.concat(Object.keys(record).filter(field => field !== '_id')), []);
    const uniqueFields = [...new Set(allFields)];

    // Generate table headers
    generateTableHeaders(uniqueFields, tableHeaderId);

    // Generate table rows excluding _id field
    const rowsHTML = records.map(record => generateRecordRow(record, uniqueFields)).join('');
    recordsContainer.innerHTML = rowsHTML;

    // Show the records table
    const recordsTable = document.getElementById('records-table');
    if (recordsTable) {
        recordsTable.style.display = 'block';
    } else {
        console.error('Records table element not found.');
    }
}

// Function to handle "See all records" button click
document.getElementById('seeAllRecordsBtn').addEventListener('click', async () => {
    try {
        const records = await fetchRecords();
        displayRecords(records, 'table-header-all', 'records-container-all');
    } catch (error) {
        console.error('Error fetching or displaying records:', error);
    }
});

async function searchRecords() {
    try {
        const account = document.getElementById('accountInput').value;
        const activity = document.getElementById('activityInput').value;
        const lineOfBusiness = document.getElementById('lineOfBusinessInput').value;

        const searchCriteria = {};
        if (account) searchCriteria.account = account;
        if (activity) searchCriteria.activity = activity;
        if (lineOfBusiness) searchCriteria.lineOfBusiness = lineOfBusiness;

        const response = await fetch('/searchRecords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchCriteria)
        });

        if (!response.ok) {
            throw new Error('Failed to search records');
        }

        const records = await response.json();
        displayRecords(records, 'table-header-search', 'records-container-search');
        
        // Toggle table visibility after displaying search results
        toggleTableVisibility('records-table-search', 'seeAllRecordsBtn');
    } catch (error) {
        console.error('Error searching records:', error);
    }
}


document.getElementById('searchButton').addEventListener('click', async () => {
    await searchRecords();
});

// Function to toggle the visibility of the search form
function toggleSearchFormVisibility() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.style.display = searchForm.style.display === 'none' ? 'block' : 'none';
    } else {
        console.error('Search form element not found.');
    }
}

// Event listener for the search records button click
document.getElementById('searchRecordsBtn').addEventListener('click', () => {
    toggleSearchFormVisibility();
});



// Function to toggle the visibility of the table and update button text
function toggleTableVisibility(tableId, buttonId) {
    const table = document.getElementById(tableId);
    const button = document.getElementById(buttonId);
    if (table.style.display === 'none') {
        table.style.display = 'block';
        button.textContent = 'Hide all records';
    } else {
        table.style.display = 'none';
        button.textContent = 'See all records';
    }
}

