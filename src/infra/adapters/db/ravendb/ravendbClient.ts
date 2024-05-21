import DocumentStore from "ravendb";

export class RavenDbClient {
  private client;
  private dbSession;
  constructor(
    private readonly url: string,
    private readonly database: string,
  ) {
    this.client = new DocumentStore(this.url, this.database);
    this.client.initialize();
  }

  async store(store: any, id: string) {
    return this.client.openSession().store(store, id);
  }

  async saveChanges() {
    return this.client.openSession().saveChanges();
  }
}
