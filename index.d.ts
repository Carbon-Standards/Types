declare module "@carbon-standards/types" {
  /**
   * Represents metadata about the Carbon server and how clients should behave.
   */
  export type CarbonMeta = {
    /**
     * Versions that are provided by the given Carbon server.
     */
    versions: number[];
    /**
     * The request timeout value set by the server, this value should be identical between client and server pairs.
     */
    requestTimeout: number;
    /**
     * The maximum body size in bytes allowed by the server. If either request or response body exceeds this limit, the server will respond with a BODY_TOO_LARGE error.
     */
    maxBodySize: number;
    /**
     * The maximum websocket message size in bytes allowed for remote connections. If any message exceeds this limit, the server will respond with a BODY_TOO_LARGE error.
     */
    maxMessageSize: number;
    /**
     * The maximum packet size in bytes allowed by the server. If any packet exceeds this limit, the server will respond with a BODY_TOO_LARGE error.
     */
    maxPacketSize: number;
    /**
     * Contact information about the maintainer of the given Carbon server.
     *
     * Can be used to contact maintainers about security vulnerabilities.
     */
    maintainer?: {
      email: string;
      website: string;
    };
    /**
     * Meta data about the current implementation.
     *
     * Can be used to identify vulnerable servers.
     */
    project: {
      name: string;
      description?: string;
      email?: string;
      website?: string;
      repository?: string;
      version: string;
    };
  };
}
