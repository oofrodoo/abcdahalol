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

### If ListedItems page ma already stuff listed cha bhane remove them following these steps:

Press F12 to open DevTools
Go to "Application" tab
Expand "Local Storage" in the left sidebar
Click on your site's URL (localhost:3000)
Find the "posts" key
You can either:
Right-click and Delete to remove specific items
Click the 🗑️ icon to clear all localStorage
