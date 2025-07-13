const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpResponseTimeHistogram = new client.Histogram({
  name: 'http_response_time_seconds',
  help: 'Response time in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.75, 1, 2, 5] // Customize buckets
});

// Middleware to collect response time
app.use((req, res, next) => {
  const end = httpResponseTimeHistogram.startTimer();
  res.on('finish', () => {
    httpRequestCounter.inc({ method: req.method, route: req.path, status_code: res.statusCode });
    end({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
});

//  Health check
app.get('/health', (req, res) => {
  res.send('Healthy');
});

//  Telemetry endpoint
app.post('/telemetry', (req, res) => {
  console.log('Received telemetry:', req.body);
  res.status(200).send('Telemetry received');
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

//  Start server
app.listen(PORT, () => {
  console.log(`Telemetry service running on port ${PORT}`);
});
