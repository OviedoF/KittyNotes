const indexController = {};

indexController.renderHome = (req, res) => {
    res.render('index.hbs');
};

module.exports = indexController;