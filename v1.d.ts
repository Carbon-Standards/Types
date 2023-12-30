declare module "@carbon-standards/types/v1" {
  /**
   * Represents messages sent between the client and server.
   */
  export type CarbonPacket =
    | CarbonRequest
    | CarbonResponse
    | CarbonOpen
    | CarbonClose
    | CarbonMessage
    | CarbonError;

  /**
   * Signals to the server that a remote request or connection should be made.
   */
  export type CarbonRequest = {
    /**
     * A 32 character HEX string identifying the request.
     *
     * This should be randomly generated uppon each request in order to ensure there are no response collisions.
     * If this isn't set or is invalid, the server will respond with an UNKNOWN_REQUEST error.
     */
    id: string;
    /**
     * This value identifies what kind of action is being made.
     */
    type: "request";
    /**
     * HTTP method to be used when making the request.
     *
     * If an invalid HTTP method is provided, the server will respond with an INVALID_REQUEST error.
     */
    method: string;
    /**
     * The remote URL of the request.
     *
     * If this isn't set or cannot be parsed, the server will respond with an INVALID_REQUEST error.
     *
     * If the server fails to establish a connection, the server will respond with a CONNECTION_FAILED error.
     */
    url: string;
    /**
     * Outgoing headers that will be sent to the remote.
     *
     * If the headers are in an invalid format, the server will respond with an INVALID_REQUEST error.
     */
    headers: Record<string, string>;
    /**
     * An integer value representing the size of the body in bytes.
     *
     * If this value exceeds the `maxBodySize` value provided by the server, the server will respond with a BODY_TOO_LARGE error.
     */
    body?: number;
  };

  /**
   * Represents a response from the remote.
   */
  export type CarbonResponse = {
    /**
     * A 32 character HEX string identifying the request.
     *
     * This should be randomly generated uppon each request in order to ensure there are no response collisions.
     * If this isn't set or is invalid, the server will respond with an UNKNOWN_REQUEST error.
     */
    id: string;
    /**
     * This value identifies what kind of action is being made.
     */
    type: "response";
    /**
     * The HTTP status code provided by the remote resource.
     */
    status: number;
    /**
     * The HTTP status text provided by the remote resource.
     */
    statusText: string;
    /**
     * The response headers provided by the remote.
     */
    headers: Record<string, string>;
    /**
     * An integer value representing the size of the body in bytes.
     *
     * If this value exceeds the `maxBodySize` value set by the server, the server will respond with a BODY_TOO_LARGE error.
     */
    body?: number;
  };

  /**
   * Signals to the client or server that a websocket connection has been opened.
   */
  export type CarbonOpen = {
    /**
     * A 32 character HEX string identifying the connection.
     *
     * This should be randomly generated uppon each connection in order to ensure there are no collisions.
     */
    id: string;
    /**
     * This value identifies what kind of action is being made.
     */
    type: "open";
    /**
     * The response headers provided by the remote.
     */
    headers: Record<string, string>;
  };

  /**
   * Signals to the client or server that a websocket connection should be closed.
   */
  export type CarbonClose = {
    /**
     * A 32 character HEX string identifying the connection.
     *
     * This should be randomly generated uppon each connection in order to ensure there are no collisions.
     * If this isn't set or is invalid, the server will respond with an UNKNOWN_REQUEST error.
     */
    id: string;
    /**
     * This value identifies what kind of action is being made.
     */
    type: "close";
    /**
     * The status code for closing the connection.
     */
    code: number;
    /**
     * The reason for closing the connection.
     */
    reason: string;
  };

  /**
   * Represents a message sent over a websocket connection.
   */
  export type CarbonMessage = {
    /**
     * A 32 character HEX string identifying the message.
     *
     * This should be randomly generated uppon each message in order to ensure there are no collisions.
     * If this isn't set or is invalid, the server will respond with an UNKNOWN_REQUEST error.
     */
    id: string;
    /**
     * A 32 character HEX string identifying the connection.
     */
    connection: string;
    /**
     * This value identifies what kind of action is being made.
     */
    type: "message";
    /**
     * An integer value representing the size of the message in bytes.
     *
     * If this value exceeds the `maxMessageSize` value set by the server, the server will respond with a BODY_TOO_LARGE error.
     */
    data: number;
    /**
     * The data type of the message.
     */
    dataType: "text" | "binary";
  };

  /**
   * Represents an error that occured on the server.
   */
  export type CarbonError = {
    /**
     * A 32 character HEX string identifying the connection.
     *
     * This should be randomly generated uppon each connection in order to ensure there are no collisions.
     * If this isn't set or is invalid, the server will respond with an UNKNOWN_REQUEST error.
     */
    id: string;
    /**
     * This value identifies what kind of action is being made.
     */
    type: "error";
    /**
     * The error code.
     */
    code:
      | "UNKNOWN_REQUEST"
      | "INVALID_REQUEST"
      | "CONNECTION_FAILED"
      | "REQUEST_TIMEOUT"
      | "BODY_TOO_LARGE"
      | "UNKNOWN";
    /**
     * The error message.
     */
    message: string;
  };
}
