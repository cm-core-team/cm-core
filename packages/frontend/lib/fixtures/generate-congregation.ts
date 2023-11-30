import { Congregation } from "../types/congregation";
import { faker } from "@faker-js/faker";

export class CongregationGenerator {
  public static instance = new CongregationGenerator();

  /**
   * Generates a random congregation
   */
  public random(): Congregation {
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
      lat: faker.location.latitude().toString(),
      lon: faker.location.longitude().toString(),
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
  public randomWithSubs(nsame: number = 5, nsets: number = 10) {
    const rootWithSubs = [];

    for (let i = 0; i < nsets; i++) {
      // The congregation with the main address
      const root = this.random();
      rootWithSubs.push(root);

      for (let j = 0; j < nsame; j++) {
        // A congregation that has the same address as root congregation
        const child = this.random();
        child.lat = root.lat;
        child.lon = root.lon;
        child.address = root.address;

        rootWithSubs.push(child);
      }
    }

    return rootWithSubs;
  }
}
