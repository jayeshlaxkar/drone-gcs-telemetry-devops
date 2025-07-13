
# Drone GCS Telemetry DevOps Assignment

## Features
- Node.js Express API for receiving telemetry
- Dockerized with Dockerfile and docker-compose
- CI/CD with GitHub Actions
- Monitoring with Prometheus and Grafana

## Setup

```bash
git clone <repo>
docker-compose up --build
```

## Architecture

[Drone] => [API Service] => [MongoDB]
                        => [Prometheus + Grafana]

<img width="906" height="613" alt="image" src="https://github.com/user-attachments/assets/d996553e-8f1e-4a78-902e-ed84491873f1" />


            

## Key Decisions
- Used Docker Compose for local simulation
- GitHub Actions for CI/CD pipelines
- Environment variables for secret management
- Prometheus for metrics collection
- Grafana for visualization

## API Endpoints
- `POST /telemetry` - Receive telemetry data
- `GET /metrics` - Expose Prometheus metrics

## Monitoring Setup
1. Install Prometheus and Grafana
2. Configure Prometheus to scrape `/metrics` endpoint
3. Use Grafana to visualize metrics

## CI/CD Pipeline
- Build Docker image on push
- Run tests in CI
- Deploy to production on merge to main branch

## Contact
For any issues or contributions, please contact [Jayesh Laxkar] at [jayesh.laxkar@gmail.com]

