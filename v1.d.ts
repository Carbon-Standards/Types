declare module "@psocket/types/v1" {
  export type PSocketRequest = {
    /**
     * A 32 character HEX string identifying the request.
     *
     * This should be randomly generated uppon each request in order to ensure there are no response collisions.
     * If this isn't set, the server will respond with an error.
     */
    id: string;
    /**
     * This value is used by the server to determine what kind of action is being completed.
     *
     * This value may be one of seven different values.
     *
     * ``"request" | "response" | "connect" | "open" | "close" | "message" | "error"`
     */
    type: "request";
    /**
     * A string to set request's method.
     *
     * If an invalid HTTP method is provided, the server will respond with an error.
     */
    method: string;
    /**
     * The remote URL.
     *
     * If this isn't set, the server will respond with an error.
     */
    url: string;
    /**
     * Headers to be sent to the remote.
     *
     * Note that no other headers apart from what is specified here will be sent to the remote.
     */
    headers: Record<string, string>;
    /**
     * An integer value representing the size of the body in bytes.
     *
     * If set, the server will wait for the full body to be recieved before making any requests.
     */
    body?: number;
  };

  export type PSocketResponse = {
    /**
     * The 32 character HEX string identifying the response.
     *
     * This id represents which `PSocketRequest` the given response corelates to.
     */
    id: string;
    /**
     * This value is used by the client to determine what kind of action is being completed.
     *
     * This value may be one of seven different values.
     *
     * ``"request" | "response" | "connect" | "open" | "close" | "message" | "error"`
     */
    type: "response";
    /**
     * The final URL provided by the response.
     *
     * This may differ from the request URL if the server redirected the request.
     */
    url: string;
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
     * If set, the client will wait for the full body to be recieved before finalizing any requests.
     */
    body?: number;
  };

  export type PSocketConnect = {
    /**
     * The 32 character HEX string identifying the connection.
     */
    id: string;
    /**
     * This value is used by the client and server to determine what kind of action is being completed.
     *
     * This value may be one of seven different values.
     *
     * ``"request" | "response" | "connect" | "open" | "close" | "message" | "error"`
     */
    type: "connect";
    /**
     * The remote URL.
     *
     * If this isn't set, the server will respond with an error.
     */
    url: string;
    /**
     * The protocols to be used when connecting to the remote.
     */
    protocols: string[];
    /**
     * Headers to be sent to the remote.
     *
     * Note that no other headers apart from what is specified here will be sent to the remote.
     */
    headers: Record<string, string>;
  };

  export type PSocketOpen = {
    /**
     * The 32 character HEX string identifying the response.
     */
    id: string;
    /**
     * This value is used by the client and server to determine what kind of action is being completed.
     *
     * This value may be one of seven different values.
     *
     * ``"request" | "response" | "connect" | "open" | "close" | "message" | "error"`
     */
    type: "open";
    /**
     * The final URL provided by the response.
     *
     * This may differ from the request URL if the server redirected the request.
     */
    url: string;
    /**
     * The protocol accepted by the remote.
     */
    protocol: string;
    /**
     * Headers to be sent to the remote.
     *
     * Note that no other headers apart from what is specified here will be sent to the remote.
     */
    headers: Record<string, string>;
  };

  export type PSocketClose = {
    /**
     * The 32 character HEX string identifying the connection.
     */
    id: string;
    /**
     * This value is used by the client and server to determine what kind of action is being completed.
     *
     * This value may be one of seven different values.
     *
     * `"request" | "response" | "connect" | "open" | "close" | "message" | "error"`
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

  export type PSocketMessage = {
    /**
     * The 32 character HEX string identifying the connection.
     *
     * This id represents which `PSocketConnect` packet the given message corelates to.
     */
    id: string;
    /**
     * This value is used by the client and server to determine what kind of action is being completed.
     *
     * This value may be one of seven different values.
     *
     * ``"request" | "response" | "connect" | "open" | "close" | "message" | "error"`
     */
    type: "message";
    /**
     * An integer value representing the size of the message in bytes.
     *
     * The client/server will wait for the full message to be recieved before forwarding the message.
     */
    data: number;
    /**
     * The data type of the message.
     */
    dataType: "text" | "binary";
  };
}
