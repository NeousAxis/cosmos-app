export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    return res.status(200).json({
        status: 'ok',
        service: 'COSMOS AI',
        timestamp: new Date().toISOString()
    });
}
