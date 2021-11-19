import * as querystring from 'querystring';

// This is used to replace the placeholders of the url with data(body)
export const injectParameters = (urlTemplate: string, data: any = {}, hasBody = true): {url: string, data: any} => {
  let url = urlTemplate;

  for (const tag of url.match(/:\w+/g) || []) {
    const urlTag = tag.slice(1);

    // PORT :8000/...
    if (!isNaN(parseInt(urlTag, 10))) {
      delete data[urlTag];
      continue;
    }
    let value = data[urlTag];
    if (value === undefined) {
      value = urlTag;
    }
    url = url.replace(tag, encodeURIComponent(value));

    // Remove that tag from the body
    delete data[urlTag];
  }

  if (!hasBody) {
    const qs = querystring.stringify(data);
    if (qs) {
      url += (url.indexOf('?') >= 0 ? '&' : '?') + qs;
    }
  }

  // Returning here the url and the updated body. This is needed because
  // otherwise data would not be updated as it is passed by value
  // It's a trade off to prevent sending a body with unwanted data in it
  return {url, data};
};
