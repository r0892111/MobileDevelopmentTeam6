#! /bin/bash

cd ..

npx prisma generate --schema=./prisma/schema.prisma

npx prisma migrate deploy --schema=./prisma/schema.prisma

npx ts-node prisma/seed.ts
