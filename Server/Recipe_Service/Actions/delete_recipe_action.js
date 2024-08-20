const {getUserByUserName} = require ('../../User_Service/Queries/user_queries');
const AWS = require('aws-sdk');

// Configure AWS SDK
const s3 = new AWS.S3({
    region: process.env.AWS_REGION,          
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const deleteRecipeAction = async (username, recipename) => {
    const foundUser = await getUserByUserName(username);
    if (!foundUser) throw new Error("User not found");

    const recipeIndex = foundUser.recipes.findIndex((recipe) => recipe.recipename === recipename);
    if (recipeIndex === -1) throw new Error("Recipe not found.");

    const recipe = foundUser.recipes[recipeIndex];

    // Delete the image from S3 if it exists
    if (recipe.imageKey) {
        await deleteImageFromS3(recipe.imageKey);
    }

    // Remove the recipe from the user's recipes
    foundUser.recipes.splice(recipeIndex, 1);
    await foundUser.save();
};

const deleteImageFromS3 = async (key) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME, // Your bucket name
        Key: key, // The key of the image to delete
    };

    try {
        await s3.deleteObject(params).promise();
        console.log(`Deleted image from S3: ${key}`);
    } catch (error) {
        console.error('Error deleting image from S3:', error);
        throw new Error('Error deleting image from S3');
    }
};


module.exports = {deleteRecipeAction};