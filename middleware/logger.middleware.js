import fs from 'fs';
const logger = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
    fs.appendFileSync('logs.txt',log);
    next();
}
export default logger;