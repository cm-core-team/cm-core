import { Pool, PoolClient } from "pg";

/**
 * Need this as a singleton class to maintain global state.
 * Efficiently allows us to create one and only one client.
 */
export class DBClient {
  public static shared = new DBClient();

  private pool: Pool;
  private client: Promise<PoolClient>;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DB_URL,
    });
    this.client = this.pool.connect();
  }

  public async getClient(): Promise<PoolClient> {
    return await this.client;
  }

  public async teardown() {
    (await this.client).release();
    await this.pool.end();
  }
}
