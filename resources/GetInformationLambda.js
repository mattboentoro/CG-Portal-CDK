const { getInformation } = require('./functions/GetInformation');
const { connectToDatabase } = require('./mongodb/mongoDbClient');

exports.main = async (event) => {
    try {
        const { date } = event.queryStringParameters;
        const { name } = event.queryStringParameters;
        const db = await connectToDatabase();
        const res = await getInformation(db, JSON.parse(date), name);     
        return res;
        
    } catch (error) {
        console.error(error);
      
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }), // ensure the response body is a string
        };
    }
  
  };