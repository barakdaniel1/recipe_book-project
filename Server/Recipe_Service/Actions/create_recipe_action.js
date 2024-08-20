const AWS = require('aws-sdk');
const {getUserByUserName} = require('../../User_Service/Queries/user_queries');


// Configure AWS SDK
const s3 = new AWS.S3({
    region: process.env.AWS_REGION,          
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadImageToS3 = async (image) => {
    const key = `images/${Date.now()}_${image.originalname}`;
    const params = {
        Bucket: process.env.S3_BUCKET_NAME, // Add your bucket name in your .env file
        Key: key, // Unique name for the image
        Body: image.buffer,
        };

    try {
        const uploadResult = await s3.upload(params).promise();
        return {location : uploadResult.Location, key : key}; // Returns the URL of the uploaded image
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Error uploading image to S3');
    }
};

const createRecipeAction = async (username,recipename, ingredients, instructions, tags, image) => {
    const foundUser = await getUserByUserName(username);
    if(!foundUser) throw new Error("User not found");
    
    let imageUrl = '';
    let imageKey = '';
    if(image){
        // Upload image to S3 and get the URL
        const uploaded = await uploadImageToS3(image);
        imageUrl = uploaded.location;
        imageKey = uploaded.key;
    }


    const newRecipe = {
        recipename: recipename,
        ingredients: ingredients,
        instructions: instructions,
        tags: tags,
        image: imageUrl,
        imageKey : imageKey
    }

    //check if recipe already exists.
    const isExist = foundUser.recipes.filter((recipe) => recipe.recipename === recipename);
    if(isExist.length > 0) throw new Error("recipe name already exists.");
    
    //add the new recipe to the user's recipe list.
    foundUser.recipes.push(newRecipe);
    await foundUser.save();
    return imageUrl;
}

module.exports = {createRecipeAction};