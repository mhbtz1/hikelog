import express from 'express'
import { generateHikeSummary } from './geminiService'
const app = express()


app.get("/hikelist", async (req, resp) => {
    const body = await req.body()
    const result = await generateHikeSummary({
        id: body.id,
        name: body.name,
        location: body.location,
        date: body.date,
        notes: body.notes,
        photos: body.photos,
        difficulty: body.difficulty,
        distance: body.distance
    })
    resp.header({"Content-Type": "application/json"})
    resp.status(200).json(JSON.stringify(result))
})