import express from 'express'

const app = express(),
    port = process.env.PORT || 8000

app.get('/', (req,res)=> {
    
    res.send('alive')
})

app.listen({port}, () => process.stdout.write(`The app listens on http://localhost:${port}\n`))