import express from 'express';
import { signup, login, logout, deleteStaff } from '../controllers/stuffController.js';
import checkLogin from '../middlewares/checkLogin.js'

const router = express.Router();


router.route('/signup').post(signup);
router.route('/login').post(login);
// secured routes
router.route('/logout').post(checkLogin, logout);
router.route('/deletestaff').delete(checkLogin, deleteStaff);

// secured routes
// router.route('/asd').post(checkLogin,  createPost)

// router.route('/asdf').put(checkLogin,  updatePost)

// router.route('/asds').delete(checkLogin,  deletePost)

// router.route('/adff').get(  getPosts)

export default router;
