import {
    Counter, Summary
} from 'prom-client'
import responseTime from 'response-time'

export const httpRequestsCounter = (() => {
    const metric = new Counter({
        name: "http_requests_counter",
        help: "Counts the number of requests that the service accepts",
        labelNames: ["path", "method"]
    })

    return (req,res,next) => {
        metric
        .labels(req.path, req.method)
        .inc(1)
        next()
    }   
})()

export const httpRequestsDurationSummary = (() => {
    const metric = new Summary({
        name: "http_request_duration_ms",
        help: "It measures the duration of a reqeust, grouped by method, status, and path",
        labelNames: ["method","status","path"]
    })

    return responseTime((req,res,time)=>{
        metric
        .labels(req.method,res.statusCode,req.path)
        .observe(time) // ms
    })
})()