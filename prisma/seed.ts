// prisma/seed.ts
import { prisma } from '../src/config'

async function main() {
  await prisma.userProfileType.createMany({
    data: [
      {
        name: 'Admin',
        code: 'AD',
        status: true,
      },
      {
        name: 'Business Owner',
        code: 'BO',
        status: true,
      },
      {
        name: 'Client',
        code: 'CL',
        status: true,
      },
      {
        name: 'Manager',
        code: 'MA',
        status: true
      }
    ]
  })
}

main()
  .then(() => {
    console.log('Seeding completed.')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    return prisma.$disconnect()
  })
