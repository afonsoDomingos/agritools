const express = require('express');
const router = express.Router();
const { getSpecialties, createSpecialty, updateSpecialty, deleteSpecialty } = require('../controllers/specialtyController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getSpecialties).post(protect, admin, createSpecialty);
router.route('/:id').put(protect, admin, updateSpecialty).delete(protect, admin, deleteSpecialty);

module.exports = router;
