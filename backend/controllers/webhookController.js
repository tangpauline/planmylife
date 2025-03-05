const { processIntent } = require("../services/dialogflowService");

// takes in WebhookRequest POST from Dialogflow
const handleWebhook = async (req, res) => {
    try {
        // console.log(req.body)
        const result = await processIntent(req.body);
        res.json(result);
    } catch (error) {
        console.error('Error handling the request:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { handleWebhook };