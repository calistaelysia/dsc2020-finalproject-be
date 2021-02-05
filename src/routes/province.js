const express = require('express');

const {getProvince, addProvince, updateProvince, deleteProvince} = require('../controllers/province');

const router = express.Router();

router.route('/')
    .get(getProvince)
    .post(addProvince);

router.route('/:provinceId')
    .get(getProvince)
    .put(updateProvince)
    .delete(deleteProvince);

module.exports = router;