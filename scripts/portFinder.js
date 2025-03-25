const fs = require("fs");
const net = require("net");
const path = require("path");

function findAvailablePort(startPort = 4000) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();

    server.on("error", () => {
      findAvailablePort(startPort + 1).then(resolve);
    });

    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

async function updateEnvFile() {
  try {
    const port = await findAvailablePort();
    const envContent = `REACT_APP_API_URL=http://localhost:${port}/api\nPORT=${port}`;
    const envPath = path.resolve(__dirname, "..", ".env");
    fs.writeFileSync(envPath, envContent);
    console.log(`✅ Updated .env with port ${port}`);
  } catch (error) {
    console.error("❌ Error updating port:", error);
  }
}

// Export both functions
module.exports = {
  findAvailablePort,
  updateEnvFile,
};
