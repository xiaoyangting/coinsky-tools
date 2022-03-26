import { filterParams, trimParams } from "./params"
const optionInit = (url, params) => {
  const defaultConfig = {
      method: "GET",
      errorCallBack(response) {
          console.log(response);
      },
      catchrCallBack(error) {
          console.log(error)
      }
  }

  const { body, rawJson, errorCallBack, catchrCallBack, ...other } = Object.assign({}, defaultConfig, params);
  const options = Object.assign({}, other);

  if (other.method === "GET" && body) {
      url += "?" + trimParams(body);
  } else if (other.method === "POST") {
      if (rawJson) {
          options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }

          options.body = JSON.stringify(filterParams(rawJson));
      }
  }

  return [url, options || {}, { errorCallBack, catchrCallBack }];
}
export default function Request(url, params) {
  const [urls, options, callback] = optionInit(url, params || {});
  return fetch(process.env.NEXT_PUBLIC_TOOLS_BASEURL + urls, options)
      .then((body) => {
          return body.json()
      })
      .then((res) => {
          const { code, result } = res;
          if (code === 0) {
              return result;
          } else {
            callback.catchrCallBack(res)
          }
      })
      .catch((error) => {
          callback.errorCallBack(error)
      });
}