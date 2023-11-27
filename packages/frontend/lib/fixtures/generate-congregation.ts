import { Congregation } from "../types/congregation";
import { faker } from "@faker-js/faker";

export function generateCongregation(): Congregation {
  return {
    id: 0,
    name: faker.location.county(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    phoneNumbers: [
      {
        ext: "+44",
        phone: faker.phone.number(),
      },
    ],
    users: [],
  };
}
