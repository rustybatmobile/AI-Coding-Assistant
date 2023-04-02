// const express = require("express");
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import cors from 'cors';
import * as dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded());


app.post("/", async (req, res) => {

    const {prompt} = req.body;
    console.log(prompt, "we getting it?")

    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.6,
            max_tokens: 3000, 
            top_p: 1, 
            frequency_penalty: 0.5, 
            presence_penalty: 0
        });

        res.send({bot: response.data.choices[0].text});
    } catch(error) {
        res.status(500).send({error})
    }    

})

app.listen(3000, () => {
    console.log("Listening to port 3000 ")
})      