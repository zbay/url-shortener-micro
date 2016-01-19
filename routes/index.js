module.exports = function(app) {
  app.get("/", function(req, res) {
      res.sendfile(process.cwd() + '/public/index.html');
    });
};