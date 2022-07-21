import {
  CreateKeyspaceCommand,
  GetKeyspaceCommand,
  IncrementValueCommand,
  KeyspaceAlreadyExistsError,
  KeyspaceNotActiveError,
  KeyspaceNotFoundError,
  StashClient,
  StashServiceException,
  Status,
} from "@stedi/sdk-client-stash";

export class ControlNumber {
  keyspaceName: string;
  client: StashClient;

  /**
   * @param apiKey your Stedi API Key
   * @param keyspaceName the Stash keyspace to use for your control numbers
   */
  constructor(apiKey: string, keyspaceName: string) {
    this.keyspaceName = keyspaceName;
    this.client = new StashClient({
      apiKey: apiKey,
      region: "us",
    });
  }

  /**
   * Poll this function until response is true
   * @returns true if the keyspace is ready, false otherwise
   */
  async prepareKeyspace(): Promise<boolean> {
    await this.createKeyspace();
    return this.isKeyspaceReady();
  }

  /**
   * Get the next control number
   * @param controlNumberKey The key for the control number. Use different keys for different control number counters.
   * @returns the next control number
   */
  async getNextControlNumber(controlNumberKey: string): Promise<number> {
    const input = {
      keyspaceName: this.keyspaceName,
      key: controlNumberKey,
      amount: 1,
    };
    const response = await this.client
      .send(new IncrementValueCommand(input))
      .catch((e) => {
        this.logSdkError(e);
        throw e;
      });
    return response.value as number;
  }

  private async createKeyspace() {
    const input = {
      keyspaceName: this.keyspaceName,
    };
    return this.client.send(new CreateKeyspaceCommand(input)).catch((e) => {
      if (e instanceof KeyspaceAlreadyExistsError) {
        return;
      }
      this.logSdkError(e);
      throw e;
    });
  }

  private async isKeyspaceReady(): Promise<boolean> {
    const input = {
      keyspaceName: this.keyspaceName,
    };
    return this.client
      .send(new GetKeyspaceCommand(input))
      .then((r) => {
        return r.status == Status.ACTIVE;
      })
      .catch((e) => {
        if (
          e instanceof KeyspaceNotActiveError ||
          e instanceof KeyspaceNotFoundError
        ) {
          return false;
        }
        this.logSdkError(e);
        throw e;
      });
  }

  private logSdkError(e: any) {
    const code = e.code;
    if (e instanceof StashServiceException) {
      console.log(
        `[ERROR] httpStatusCode: ${e.$metadata.httpStatusCode}. Code: ${code}. Message: ${e.message} RequestId: ${e.$metadata.requestId}`
      );
    } else {
      console.log("[ERROR]", e);
    }
  }
}
