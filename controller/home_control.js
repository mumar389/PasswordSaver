module.exports.Home=async(req,res)=>{
    // console.log("reached");
    return res.status(200).json({
        message:"Home Reached"
    })
}