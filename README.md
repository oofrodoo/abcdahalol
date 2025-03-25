## Setup Instructions

### Prerequisites

- Node.js
- PostgreSQL
- npm

### Installation

```bash ma lekhne
# Clone the repository
git clone https://github.com/oofrodoo/abcdahal.git

# Install dependencies
npm install
npm install pg
```

### Running the Application

```powershell
# Start the application
npm run start
```

### Troubleshooting Port Issues

Check if port is in use:

```powershell
netstat -ano | findstr :4000
```

Kill process using port:

```powershell
taskkill /F /PID xxxx  # Replace xxxx with PID from above command
```

### How to Clear Listed Items from Local Storage

To remove items that are already listed on the ListedItems page, follow these steps:

1. Open Developer Tools:

   - Press `F12` on your keyboard OR
   - Right-click anywhere on the page and select "Inspect"

2. Navigate to Local Storage:

   - Click on the "Application" tab in DevTools
   - In the left sidebar, expand "Local Storage"
   - Click on "http://localhost:3000"

3. Manage Posts Data:

   - Look for the "posts" key in the storage list
   - To remove specific items:
     1. Double-click on the "posts" value
     2. Edit the JSON data directly
     3. Press Enter to save changes
   - To remove all items:
     1. Right-click on "posts"
     2. Select "Delete" OR
     3. Click the 🗑️ (trash) icon at the top to clear all storage

4. Verify Changes:
   - Refresh the ListedItems page
   - The removed items should no longer appear

**Note:** Clearing localStorage will permanently delete all stored items. Make sure to backup any important data before clearing.
