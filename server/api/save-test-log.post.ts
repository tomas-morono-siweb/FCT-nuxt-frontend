export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Crear log con timestamp
    const logEntry = {
        timestamp: new Date().toISOString(),
        testResults: body,
        summary: {
            totalTests: 3,
            successful: Object.values(body).filter(result => result !== null).length,
            failed: body.errors?.length || 0
        }
    };

    // Log en consola para revisión inmediata
    console.log('📊 === RESULTADOS DE PRUEBA API ===');
    console.log('🕐 Timestamp:', logEntry.timestamp);
    console.log('📈 Resumen:', logEntry.summary);
    console.log('🔍 Detalles completos:', JSON.stringify(logEntry, null, 2));
    console.log('📊 === FIN RESULTADOS ===');

    // También guardar en archivo (opcional)
    try {
        const fs = await import('fs/promises');
        const logFile = './api-test-results.json';

        // Leer logs existentes o crear array vacío
        let existingLogs = [];
        try {
            const existingData = await fs.readFile(logFile, 'utf-8');
            existingLogs = JSON.parse(existingData);
        } catch {
            // Archivo no existe, empezar con array vacío
        }

        // Agregar nuevo log
        existingLogs.push(logEntry);

        // Mantener solo los últimos 10 logs
        if (existingLogs.length > 10) {
            existingLogs = existingLogs.slice(-10);
        }

        // Guardar archivo
        await fs.writeFile(logFile, JSON.stringify(existingLogs, null, 2));
        console.log('💾 Log guardado en:', logFile);
    } catch (error) {
        console.log('⚠️ No se pudo guardar archivo de log:', error.message);
    }

    return {
        success: true,
        message: 'Log almacenado correctamente',
        timestamp: logEntry.timestamp
    };
});
