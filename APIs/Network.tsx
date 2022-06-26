export class Network {
  static async fetch(url: string, init: any) {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setTimeout(() => abortController.abort(), 50000);

    const response = await fetch(url, {
      mode: "cors",
      ...init,
      signal: signal,
      headers: Network.getHeaders(init.headers),
    });
    let promise;
    if (
      response.status !== 200 &&
      response.status !== 201 &&
      response.status !== 404
    ) {
      promise = Network.handleErrorsBasedOnStatus(response);
    } else {
      promise = response.json();
    }

    return promise;
  }

  static getHeaders(originalHeaders: any) {
    let headers = {
      "content-type": "application/json",
      // Authorization: "e1020b8ed7894a8dadec00a544983173",
    };

    headers = {
      ...headers,
      ...originalHeaders,
    };

    return headers;
  }
  static handleErrorsBasedOnStatus(response: any) {
    let promise = response.json().then((data: any) => {
      return Promise.reject(data);
    });

    return promise.catch((error: any) => {
      return Promise.reject(error);
    });
  }
}
