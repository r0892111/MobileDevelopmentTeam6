#! /bin/bash

cd ..

npx prisma migrate dev --schema=./prisma/schema.prisma --name $(uuidgen)
