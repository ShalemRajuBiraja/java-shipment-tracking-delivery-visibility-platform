# Creates the shiptrack database on local PostgreSQL (adjust user/host if needed).
# Run after setting your postgres password in ship-track-backend/src/main/resources/application-local.properties

$ErrorActionPreference = "Stop"

$dbName = "shiptrack"
$pgUser = "postgres"

Write-Host "Creating database '$dbName' if it does not exist..."

$createSql = "SELECT 1 FROM pg_database WHERE datname = '$dbName'"
$exists = & psql -U $pgUser -tAc $createSql 2>$null

if ($exists -match "1") {
    Write-Host "Database '$dbName' already exists."
} else {
    & psql -U $pgUser -c "CREATE DATABASE $dbName;"
    Write-Host "Database '$dbName' created."
}

Write-Host "Done. Start backend with: cd ship-track-backend; .\mvnw.cmd spring-boot:run"
