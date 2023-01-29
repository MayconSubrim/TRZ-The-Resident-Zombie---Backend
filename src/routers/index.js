const { Router } = require("express");
const survivorRouter = require("./SurvivorsRouter");
const ItemRouter = require("./IntemRouter")


const router = Router()

router.use(survivorRouter);
router.use(ItemRouter);


module.exports = router;