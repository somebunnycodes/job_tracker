// Pull in environment variable for API URI - set default if not available
const REACT_APP_API_URI = process.env.REACT_APP_API_URI || "http://localhost:8000";

console.log(`REACT_APP_API_URI: ${REACT_APP_API_URI}`);

export { REACT_APP_API_URI };