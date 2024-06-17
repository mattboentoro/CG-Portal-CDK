const { getAnnouncement } = require('./functions/GetAnnouncements');
const { connectToDatabase } = require('./mongodb/mongoDbClient');

exports.main = async (event) => {
    try {
        const { name } = event.queryStringParameters;
        const { date } = event.queryStringParameters;

        let withPrevious = ('with-previous' in event.queryStringParameters && JSON.parse(event.queryStringParameters['with-previous']));

        const db = await connectToDatabase();
        return getAnnouncement(db, name, JSON.parse(date), withPrevious);
        
    } catch (error) {
        console.error(error);
      
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }), // ensure the response body is a string
        };
    }
  
  };