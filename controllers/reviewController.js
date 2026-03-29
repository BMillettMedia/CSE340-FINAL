import utilities from "../utilities/index.js"
import reviewModel from "../models/review-model.js"

/* *****************************
Add Review
***************************** */
async function addReview(req,res){

const nav = await utilities.getNav()

const { review_text, review_rating, card_id } = req.body

const accountId = req.session.account.account_id

await reviewModel.addReview(
review_text,
review_rating,
accountId,
card_id
)

res.redirect(`/cards/${card_id}`)

}

/* *****************************
Delete Review
***************************** */
async function deleteReview(req,res){

const reviewId = req.params.id

await reviewModel.deleteReview(reviewId)

res.redirect("/dashboard")

}

export default {

addReview,
deleteReview

}