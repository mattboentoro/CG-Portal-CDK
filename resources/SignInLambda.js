const { signin } = require('./functions/SignIn');
const { connectToDatabase } = require('./mongodb/mongoDbClient');
const CryptoJS = require('node-cryptojs-aes').CryptoJS;

exports.main = async (event) => {
    try {

        // decrypt first
        var decrypted = CryptoJS.AES.decrypt(event.body, "CareGroup!!");
    
        let userInformation = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
        
        const db = await connectToDatabase();
        const res = await signin(db, userInformation);

        if (res !== false) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    name: res
                }), // ensure the response body is a string
            }

        } else {
            return {
                statusCode: 400,
                body: "NOT ALLOWED", // ensure the response body is a string
            }
        }
      
    } catch (error) {
        console.error(error);
      
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }), // ensure the response body is a string
        };
    }
  
  };