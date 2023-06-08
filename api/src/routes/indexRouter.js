const { Router } = require('express');
const router = Router();
const videogameRouter = require('./videogameRouter.js');
const genreRouter = require('./genreRouter.js')


// Traigo las rutas con sus handlers
router.use("/videogames", videogameRouter);
 router.use('/genres', genreRouter)


module.exports = router;