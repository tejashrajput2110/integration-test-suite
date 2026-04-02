#!/bin/sh

echo "Running smoke test..."

curl -f http://localhost:3000/health || exit 1

echo "Smoke test passed ✅"