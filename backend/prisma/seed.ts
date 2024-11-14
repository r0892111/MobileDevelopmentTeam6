import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        address: faker.location.streetAddress(),
        imageUrl: `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
        rating: faker.number.int({ min: 1, max: 5 }),
        cost: faker.number.int({ min: 1, max: 3 }),
      },
    });

    const numberOfDishes = faker.number.int({ min: 10, max: 20 });

    for (let j = 0; j < numberOfDishes; j++) {
      await prisma.dish.create({
        data: {
          name: faker.commerce.productName(),
          price: faker.number.float({ min: 2, max: 100, fractionDigits: 2 }),
          description: faker.lorem.sentences(),
          imageUrl: `https://picsum.photos/seed/${faker.string.uuid()}/800/600`,
          restaurantId: restaurant.id,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
