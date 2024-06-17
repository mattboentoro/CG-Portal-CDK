const { assignInterest } = require('./functions/AssignInterest');
const { connectToDatabase } = require('./mongodb/mongoDbClient');

exports.main = async (event) => {
    try {
    
        let toBeModified = JSON.parse(event.body);
        const db = await connectToDatabase();
        const res = await assignInterest(db, toBeModified);     
        return res;
        
    } catch (error) {
        console.error(error);
      
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }), // ensure the response body is a string
        };
    }
  
  };