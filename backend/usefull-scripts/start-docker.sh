#! /bin/bash

cd ../

docker compose --env-file app/env/.env up -d
