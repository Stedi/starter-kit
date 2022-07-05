import axios, { AxiosRequestConfig } from "axios";

export class ControlNumber {
  apiKey: string;
  keyspaceName: string;
  config: AxiosRequestConfig;

  /**
   * @param apiKey your Stedi API Key
   * @param keyspaceName the Stash keyspace to use for your control numbers
   */
  constructor(apiKey: string, keyspaceName: string) {
    this.apiKey = apiKey;
    this.keyspaceName = keyspaceName;

    this.config = {
      headers: {
        Authorization: `Key ${this.apiKey}`,
      },
    };
  }

  /**
   * Poll this function until response is true
   * @returns true if the keyspace is ready, false otherwise
   */
  async prepareKeyspace(): Promise<boolean> {
    this.createKeyspace();
    return this.isKeyspaceReady();
  }

  /** Get the next control number for the given controlNumberKey.
   * Use different controlNumberKeys to maintain separate counters for separate use-cases.
   */
  /**
   * Get the next control number
   * @param controlNumberKey The key for the control number. Use different keys for different control number counters.
   * @returns the next control number
   */
  async getControlNumber(controlNumberKey: string): Promise<number> {
    const input = {
      keyspaceName: this.keyspaceName,
      key: controlNumberKey,
      amount: 1,
    };
    const payload = JSON.stringify(input);
    const response = await axios.post(
      this.apiEndpoint("IncrementValue"),
      payload,
      this.config
    );
    return response.data.value;
  }

  private async createKeyspace() {
    const input = {
      keyspaceName: this.keyspaceName,
    };
    const payload = JSON.stringify(input);
    try {
      const response = await axios.post(
        this.apiEndpoint("CreateKeyspace"),
        payload,
        this.config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.code === "KEYSPACE_ALREADY_EXISTS") {
          return;
        }
      }
      throw error;
    }
  }

  private async isKeyspaceReady(): Promise<boolean> {
    const input = {
      keyspaceName: this.keyspaceName,
    };
    const payload = JSON.stringify(input);
    try {
      const response = await axios.post(
        this.apiEndpoint("GetKeyspace"),
        payload,
        this.config
      );
      return response.data.status === "ACTIVE";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.code === "KEYSPACE_NOT_FOUND") {
          return false;
        }
      }
      throw error;
    }
  }

  private apiEndpoint(api: string): string {
    return `https://stash.us.stedi.com/2022-04-20/${api}`;
  }
}
