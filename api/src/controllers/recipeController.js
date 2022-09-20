// const axios = require("axios");
// require('dotenv').config()
// const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");
const API = require("../api.json")


const getApiRecipes = async () => {
    try {
        // const apiCall = await axios.get(
        //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=300`
        // );
        // const recipeInfo = await apiCall.data.results.map(recipe => {
        const recipeInfo = API.results.map(recipe => {
            const { id, summary, healthScore, image } = recipe;
            return {
                id,
                name: recipe.title,
                summary,
                healthScore,
                image,
                summary: recipe.summary.replace(/<[^>]*>?/g, ""),
                diets: recipe.diets.join(" ")
            }
        })
        return recipeInfo
    } catch (error) {
        console.log(error + " #getApiInfo fail!!! 🔴🔴🔴🔴")
    }
};

const getDbRecipes = async () => {
    try {
        const getDBinfo = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        return getDBinfo;
    } catch (error) {
        console.log(error + " #getDBInfo fail!!! 🔴🔴🔴🔴")
    }
};

const getRecipes = async () => {
    try {
        const apiInfo = await getApiRecipes();
        const bdInfo = await getDbRecipes();
        const allInfo = apiInfo.concat(bdInfo);
        return allInfo;
    } catch (error) {
        console.log(error + " #getAllInfo fail!!! 🔴🔴🔴🔴")
    }
};

/* ------------------------------------------------------------------------ */

const getAllRecipesOrName = async (req, res) => {
    try {
        let allRecipes = await getRecipes();
        const { name } = req.query;
        if (name) {
            let recipeName = await allRecipes.filter(
                (obj) => obj.name.toLowerCase().includes(name.toLowerCase())
            );
            recipeName.length
                ? res.status(200).send(recipeName)
                : res.status(404).send(`Recipe: ${name} not found 🔴🔴🔴🔴`);
        } else {
            res.status(200).send(allRecipes);
        }
    } catch (error) {
        res.status(404).send(error + " #getAllRecipesOrName fail!!! 🔴🔴🔴🔴");
    }
};

const getRecipeById = async (req, res) => {
    try {
        const allRecipes = await getRecipes();
        const { id } = req.params;
        if (id) {
            let recipeId = await allRecipes.filter((obj) => obj.id == id);
            recipeId.length
                ? res.status(200).send(recipeId)
                : res.status(404).send("Recipe Not Found!!!  🔴🔴🔴🔴");
        }
    } catch (error) {
        res.status(404).send(error + " #getRecipeById fail!!! 🔴🔴🔴🔴");
    }
};

const createRecipe = async (req, res) => {
    try {
        const {
            name,
            summary,
            healthScore,
            image,
            steps,
            createdInDb,
            diets
        } = req.body

        const recipeCreated = await Recipe.create({
            name,
            summary,
            healthScore,
            image,
            steps,
            createdInDb,
            diets,
        })

        recipeCreated.addDiet(diets)
        res.status(200).send(" Recipe created!!! 🟢🟢🟢🟢")
        // .then((recipe) => recipe.addDiet(diets))
        // .then(res.send("Recipe created!!! 🟢🟢🟢🟢"))
    } catch (error) {
        res.status(404).send(error + " #createRecipe fail!!! 🔴🔴🔴🔴");
    }
};

module.exports = {
    getAllRecipesOrName,
    getRecipeById,
    createRecipe
};






