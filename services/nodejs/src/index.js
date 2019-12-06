import express from 'express'
import {collectDefaultMetrics, register} from 'prom-client'
import promitheusMiddlewares from './utils/Prometheus'

const app = express(),
    port = process.env.PORT || 8000

// middlewares
app.use(promitheusMiddlewares.numbOfRequests)
app.use(promitheusMiddlewares.sumOfResponseTime)
app.get('/', (req,res)=> { 
    res.send('alive')
})

// injects the register to /metrics
app.get('/metrics', (req,res)=> {register
    res.set({'Content-Type': register.contentType })
    res.end(register.metrics())
})
// starts the collection
collectDefaultMetrics({prefix: 'nodejs_',timeout: 5000})

app.listen({port}, () => process.stdout.write(`The app listens on http://localhost:${port}\n`))