const fs = require("fs");
const { execSync } = require("child_process");

// Color configuration
const colors = {
    error: "\x1b[31m%s\x1b[0m", // Red text for errors
    success: "\x1b[32m%s\x1b[0m", // Green text for success messages
};

function checkNvmInstallation() {
    try {
        execSync("nvm --version", { stdio: "ignore" });
    } catch (error) {
        console.error(colors.error, "nvm is not installed or not found in your PATH.");
        process.exit(1); // Exit if nvm is not installed
    }
}

function readNvmrc() {
    // Check for .nvmrc file existence
    if (!fs.existsSync(".nvmrc")) {
        console.error(colors.error, ".nvmrc file does not exist");
        return null;
    }
    // Read and trim the content of .nvmrc
    return fs.readFileSync(".nvmrc", "utf8").trim();
}

function isValidVersion(version) {
    // Simple pattern for semantic versioning, adjust as necessary
    const validVersionPattern = /^\d+\.\d+\.\d+$/;
    return validVersionPattern.test(version);
}

function switchNodeVersion() {
    const nvmVersion = readNvmrc();

    if (nvmVersion === null) {
        return; // Exit if .nvmrc doesn't exist
    }

    if (!isValidVersion(nvmVersion)) {
        console.error(colors.error, "Invalid Node.js version specified in .nvmrc");
        return;
    }

    try {
        // Attempt to switch to the specified Node.js version
        execSync(`nvm use ${nvmVersion}`, { stdio: "inherit" });
        console.log(colors.success, "Node.js version switched successfully");
    } catch (error) {
        console.error(
            colors.error,
            "Failed to switch Node.js version. Please check nvm installation."
        );
    }
}

// Execute the function to check nvm installation before switching versions
checkNvmInstallation();
switchNodeVersion();
