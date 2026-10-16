# Starts API on http://localhost:8080 using in-memory H2 (no PostgreSQL password needed).
Set-Location "$PSScriptRoot\..\ship-track-backend"
Write-Host "Starting backend (profile: dev-h2) on http://localhost:8080 ..."
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev-h2"
