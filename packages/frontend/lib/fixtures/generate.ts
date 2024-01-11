import { faker } from "@faker-js/faker";

import { Congregation } from "../types/models/congregation";
import { User, UserType, userTypeSchema } from "../types/models/user";

export class ModelGenerator {
  public static instance = new ModelGenerator();

  /**
   * Generates a random congregation
   */
  public randomCongregation(): Congregation {
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
      lat: faker.location.latitude().toString(),
      lon: faker.location.longitude().toString(),
      signature: null,
    };
  }

  public randomUser(userType?: UserType): User {
    if (userType === undefined) {
      userType = faker.helpers.arrayElement([
        userTypeSchema.Values.ADMIN,
        userTypeSchema.Values.REGULAR,
      ]);
    }

    return {
      id: 0,
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      type: userType,
      congregationId: null,
      joinToken: null,
    };
  }

  /**
   * Generates random congregations with the same addresses
   *
   * @param [nsame] number of the same congregations in a single set.
   * @param [nsets] number of sets to do.
   *
   * Total will be nsame * nsets
   */
  public randomCongregationWithSubs(nsame: number = 5, nsets: number = 10) {
    const rootWithSubs = [];

    for (let i = 0; i < nsets; i++) {
      // The congregation with the main address
      const root = this.randomCongregation();
      rootWithSubs.push(root);

      for (let j = 0; j < nsame; j++) {
        // A congregation that has the same address as root congregation
        const child = this.randomCongregation();
        child.lat = root.lat;
        child.lon = root.lon;
        child.address = root.address;

        rootWithSubs.push(child);
      }
    }

    return rootWithSubs;
  }
}

export function randomId(): number {
  return parseInt(
    faker.number
      .bigInt({
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
      })
      .toString(),
  );
}
