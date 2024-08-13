module.exports = async (req, res) => {
    try {
        res.render('checkout');
    } catch (error) {
        console.error('Error rendering contact us page:', error);
        res.status(500).send('Internal Server Error');
    }
};