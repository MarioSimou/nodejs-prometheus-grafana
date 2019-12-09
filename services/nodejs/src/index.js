import express from 'express'
import {collectDefaultMetrics, register, Summary, Histogram} from 'prom-client'
import {
    httpRequestsCounter,
    httpRequestsDurationSummary
} from './utils/Prometheus'

const app = express(),
    port = process.env.PORT || 8000

app.use(httpRequestsCounter)
app.use(httpRequestsDurationSummary)

app.get('/', (req,res)=> { 
    res.send('alive\n')
})
app.get("/ping", (req,res) => {
    try {
        const est = Math.random()
        if (Math.random() < 0.1) {
            throw new Error()
        }

        res.status(200).send("pong")
    } catch(e){
        res.status(400).send("pong")
    }
})

// injects the register to /metrics
app.get('/metrics', (req,res)=> {register
    res.set({'Content-Type': register.contentType })
    res.end(register.metrics())
})
// starts the collection
collectDefaultMetrics({prefix: 'nodejs_',timeout: 5000})

app.listen({port}, () => process.stdout.write(`The app listens on http://localhost:${port}\n`))