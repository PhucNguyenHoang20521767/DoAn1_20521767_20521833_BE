const express = require("express");
const router = express.Router();
let { getAllCatchphrases, getCatchphraseById, createCatchphrase, updateCatchphrase, deleteCatchphrase } = require("../controllers/catchphraseController")

/**
 * @swagger
 * /api/catchphrases/getAllCatchphrases:
 *   get:
 *     tags: [Catchphrase]
 *     operatorId: getAllCatchphrases
 *     description: All catchphrases
 *     responses:
 *       200:
 *         description: Returns all the catchphrases
 */
router.get("/getAllCatchphrases", async (req, res) => {
    let response = await getAllCatchphrases(req.query.s, req.query.page, req.query.limit);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /api/catchphrases/getCatchphraseById/{id}:
 *   get:
 *     tags: [Catchphrase]
 *     operatorId: getCatchphraseById
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The catchphrase ID.
 *     description: Get a catchphrase by id
 *     responses:
 *       200:
 *         description: Returns the requested catchphrase
 */
router.get("/getCatchphraseById/:id", async (req, res) => {
    let response = await getCatchphraseById(req.params.id);
    res.json(response);
});

/**
 * @swagger
 * /api/catchphrases/createCatchphrase:
 *   post:
 *     tags: [Catchphrase]
 *     operatorId: createCatchphrase
 *     parameters:
 *      - in: body
 *        name: catchphrase
 *        description: New catchphrase
 *        schema:
 *          type: object
 *          properties:
 *            movieName:
 *              type: string
 *            catchphrase:
 *              type: string
 *            movieContext:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/createCatchphrase", async (req, res) => {
    let body = {
        movieName: req.body.movieName,
        catchphrase: req.body.catchphrase,
        movieContext: req.body.movieContext,
    };
    let response = await createCatchphrase(body);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /api/catchphrases/updateCatchphrase/{id}:
 *   put:
 *     tags: [Catchphrase]
 *     operatorId: updateCatchphrase
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The catchphrase ID.
 *      - in: body
 *        name: catchphrase
 *        description: Update catchphrase
 *        schema:
 *          type: object
 *          properties:
 *            movieName:
 *              type: string
 *            catchphrase:
 *              type: string
 *            movieContext:
 *              type: string
 *     responses:
 *       201:
 *         description: Updated
 */
router.put("/updateCatchphrase/:id", async (req, res) => {
    let movieName = null, catchphrase = null, movieContext = null;
    if (req.body.movieName) {movieName = req.body.movieName}
    if (req.body.catchphrase) {catchphrase = req.body.catchphrase}
    if (req.body.movieContext) {movieContext = req.body.movieContext}
    let response = await updateCatchphrase(req.params.id, movieName, catchphrase, movieContext);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /api/catchphrases/deleteCatchphrase/{id}:
 *   delete:
 *     tags: [Catchphrase]
 *     operatorId: deleteCatchphrase
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The catchphrase ID.
 *     description: Delete a catchphrase by id
 *     responses:
 *       200:
 *         description: Returns the requested catchphrase
 */
router.delete("/deleteCatchphrase/:id", async (req, res) => {
    let response = await deleteCatchphrase(req.params.id)
    try {
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(response);
    }
});

module.exports = router;