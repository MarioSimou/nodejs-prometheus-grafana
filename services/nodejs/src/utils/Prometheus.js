import {
    collectDefaultMetrics,
    register,
    Counter,
    Gauge,
    Summary
} from 'prom-client'
import responseTime from 'response-time'

export const numOfRequests = new Counter({
    name: 'number_of_requests',
    help: 'Counts the number of request that the application acccepts'
})
export const sumOfResponseTime = new Counter({
    name: 'sum_of_response_time',
    help: 'Identifies the time that a request needs',
})
 
export const numOfRequestsMiddleware = metric => (req,res,next) => {
    if(req.path !== '/metrics'){
        metric.inc(1)
    }
    next()
}

export const sumOfResponseTimeMiddleware = metric => responseTime((req,res,time) => metric.inc(time / 1e3))


export default {
    numbOfRequests: numOfRequestsMiddleware(numOfRequests),
    sumOfResponseTime: sumOfResponseTimeMiddleware(sumOfResponseTime),
}