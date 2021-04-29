//EXPRESS
const express = require('express');
const router = express.Router(); 

//ERROR HANDLING 
const catchAsync = require('../utils/catchAsync');

//MIDDLEWARE
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

//CONTROLLERS
const campgrounds = require('../controllers/campground');

router.route('/')
   .get(catchAsync(campgrounds.index))
   .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.route('/:id')
   .get(catchAsync(campgrounds.showCampground))
   .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
   .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


module.exports = router;