const API_URL = process.env.REACT_APP_API_URL;

const ApiServices = {
  get: function(url) {
    const requestOptions = {
      method: 'GET'
    };

    return this.fetch(url, requestOptions);
  },
  fetch: function(url, requestOptions) {
    return fetch(API_URL + url, requestOptions).then(r =>
      this.handleResponse(r)
    );
  },
  parse: function(text) {
    try {
      return JSON.parse(text);
    } catch (err) {
      return null;
    }
  },
  handleResponse: function(response) {
    return response.text().then(text => {
      const data = text && this.parse(text);
      if (data === null || !response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }
};

export default ApiServices;
