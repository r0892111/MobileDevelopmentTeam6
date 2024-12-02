import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 12; i++) {
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
      const food = faker.food;
      await prisma.dish.create({
        data: {
          name: food.dish(),
          price: faker.number.float({ min: 2, max: 30, fractionDigits: 2 }),
          description: food.description(),
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
