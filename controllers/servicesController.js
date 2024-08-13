const Service = require('../models/Service');

module.exports = async (req, res) => {
    try {
        const services = await Service.find();
        console.log(services);
        res.render('services', { services });  // Pass services to the view
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).send('Internal Server Error');
    }
};
