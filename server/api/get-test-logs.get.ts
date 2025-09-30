export default defineEventHandler(async (event) => {
    try {
        const fs = await import('fs/promises');
        const logFile = './api-test-results.json';

        // Leer archivo de logs
        const logData = await fs.readFile(logFile, 'utf-8');
        const logs = JSON.parse(logData);

        return {
            success: true,
            logs: logs,
            totalLogs: logs.length,
            latestLog: logs[logs.length - 1] || null
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            logs: [],
            totalLogs: 0,
            latestLog: null
        };
    }
});
