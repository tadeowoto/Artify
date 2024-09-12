const render404 = (req, res) => {
  res.status(404).render("error/404");
};

export default render404;
