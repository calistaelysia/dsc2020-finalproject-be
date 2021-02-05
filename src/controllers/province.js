const pool = require('../config/db');

/**
 * @method GET
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getProvince = async (req, res) => {
    try {
        const {provinceId} = req.params;

        const conn = await pool.getConnection();
        let query = "", qTotal = "", provinces, totalData;

        if (provinceId !== undefined) {
            query = `SELECT name, recovered, death, positive FROM provinces WHERE id = ? AND deleted_at IS NULL`;
            [provinces] = await conn.execute(query, [provinceId]);
            
            await conn.release();
            return res.send({status: "true", message: "Fetching data success", data: provinces[0]});
        } else {
            query = `SELECT name, recovered, death, positive, url FROM provinces WHERE deleted_at IS NULL`;
            [provinces] = await conn.execute(query);
            
            qTotal = `SELECT COUNT(id) as totalData FROM provinces WHERE deleted_at IS NULL`;
            [totalData] = await conn.execute(qTotal);
            await conn.release();
            return res.send({status: "true", totalData: totalData[0].totalData, message: "Fetching data success", data: provinces});
        }

    } catch (error) {
        if (provinceId !== undefined){
            return res.send({status: "false", message: "Fetching data failed"});
        } else {
            return res.send({status: "false", message: "Id not found"});
        }
    }
}

/**
 * @method POST
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const addProvince = async (req, res) => {
    try {
        const {name, recovered, death, positive} = req.body;

        const conn = await pool.getConnection();
        var fieldSet = {
            name: name,
            recovered: recovered,
            death: death,
            positive: positive
        }
        let query = `INSERT INTO provinces SET ?`;
        const [result] = await conn.query(query, fieldSet);

        var url = "/api/v1/provinces/" + result.insertId;
        let qURL = `UPDATE provinces SET url = ? WHERE id = ?`;
        const [resURL] = await conn.execute(qURL, [url, result.insertId]);

        await conn.release();
        return res.send({status: "true", message: "Storing data success", stored: req.body});

    } catch (error) {
        return res.send({status: "false", message: "Storing data failed", error: error});
    }
}

/**
 * @method PUT
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateProvince = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const {provinceId} = req.params;
        const {name, recovered, death, positive} = req.body;

        const qBefore = `SELECT name, recovered, death, positive FROM provinces WHERE id = ?`;
        const [resBefore] = await conn. execute(qBefore, [provinceId]);
        const query =  `UPDATE provinces SET name = ?, recovered = ?, death = ?, positive = ? WHERE id = ?`;
        const [result] = await conn.execute(query, [name, recovered, death, positive, provinceId]);

        await conn.release();
        return res.send({status: "true", message: "Updating data success", before: resBefore[0], after: req.body});
    } catch (error) {
        if (provinceId !== undefined){
            return res.send({status: "true", message: "Updating data failed", error: error});
        } else{
            return res.send({status: "true", message: "Id not found"});
        }
    }
}

/**
 * @method DELETE
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteProvince = async (req, res) => {
    try {
        const {provinceId} = req.params;
        const conn = await pool.getConnection();

        const qData = `SELECT name, recovered, death, positive FROM provinces WHERE id = ?`;
        const [resData] = await conn.execute(qData, [provinceId]);

        const query = `UPDATE provinces SET deleted_at = ? WHERE id = ?`;
        const [result] = await conn.execute(query, [new Date(), provinceId]);
        
        await conn.release();
        return res.send({status: "true", message: "Destroy data success", deleted: resData});
    } catch (error) {
        if (provinceId !== undefined){
            return res.send({status: "true", message: "Destroy data failed", error: error});
        } else{
            return res.send({status: "true", message: "Id not found"});
        }
    }

}

module.exports = {
    getProvince, addProvince, updateProvince, deleteProvince
}