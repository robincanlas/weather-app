import { EventEmitter } from 'events';

import {
  EndpointConfig,
  FetchApi,
  FetchConfig,
  ResourceFetch,
  ResourceFetchTemplate,
} from '../../types/Api';
import { ContentTypes } from '../../types/Content';
import { HttpMethod, HttpStatus } from '../../types/Http';
import { getAuthorizationHeader } from '../auth';
import { toFormData } from '../form';
import { injectParameters } from '../urls';

type Mappings = {
  [contentType: string]: (resp: any) => any;
};

const defaultHeaders: any = {};

const contentTypeMappings: Mappings = {
  [ContentTypes.JSON]: resp => resp.json(),
  [ContentTypes.JS]: resp => resp.json(),
  [ContentTypes.XML]: resp => resp.text(),
  [ContentTypes.TEXT]: resp => resp.text(),
  [ContentTypes.CSV]: resp => resp.text(),
  [ContentTypes.HTML]: resp => resp.text(),
  [ContentTypes.JSON_2]: resp => resp.json(),
};

const DEFAULT_ENDPOINT_CONFIG: EndpointConfig = {
  authenticated: true,
  endpointHeaders: {},
};

class Api extends EventEmitter implements FetchApi {
  public GET = this._makeMethod(HttpMethod.GET);
  public POST = this._makeMethod(HttpMethod.POST, true);
  public PUT = this._makeMethod(HttpMethod.PUT, true);
  public DELETE = this._makeMethod(HttpMethod.DELETE);
  public PATCH = this._makeMethod(HttpMethod.PATCH, true);

  public setDefaultHeader = (key: string, value: string) => {
    defaultHeaders[key] = value;
  }

  public _makeMethod(method: HttpMethod, hasBody: boolean = false): ResourceFetchTemplate<any, any> {
    return (
      urlTemplate: string,
      endpointConfig: EndpointConfig = DEFAULT_ENDPOINT_CONFIG,
    ): ResourceFetch<any, any> => {
      return (data: any = undefined, fetchConfig: FetchConfig = {}): Promise<any> => {
        const result: {url: string, data: any} = injectParameters(urlTemplate, data, hasBody);
        const { authenticated, endpointHeaders } = endpointConfig;

        const headers: any = {
          Accept: ContentTypes.JSON,
          ...defaultHeaders,
          ...endpointHeaders,
        };

        let body = null;
        if (hasBody && result.data) {
          if (typeof result.data === 'string') {
            body = result.data;
            headers['Content-Type'] = ContentTypes.TEXT;
          } else if (result.data instanceof FormData || fetchConfig.asFormData) {
            body = toFormData(result.data);
            headers['Content-Type'] = ContentTypes.FORM_DATA;
          } else {
            body = JSON.stringify(result.data);
            headers['Content-Type'] = ContentTypes.JSON;
          }
        }

        if (authenticated && !headers.Authorization) {
          headers.Authorization = getAuthorizationHeader();
        }

        return this._makeRequest(method, result.url, headers, body);
      };
    };
  }

  public _makeRequest(
    method: HttpMethod,
    url: string,
    headers: HeadersInit,
    body: string | FormData | null,
  ): Promise<any> {
    return fetch(url, {
      method,
      headers,
      body,
    })
      .then((response: any) => {
        this.emit(`${response.status}`, url);
        const contentType = response.headers.get('Content-Type');
        console.log(contentType, 'content');
        const mappingFunction = contentTypeMappings[contentType] || (resp => resp.arrayBuffer());

        return new Promise(resolve => resolve(mappingFunction(response)))
          .catch(err => {
            Promise.reject({
              type: 'NetworkError',
              status: response.status,
              message: err,
            });
          })
          .then((responseBody: any) => {
            if (response.ok) {
              console.log(response, 'RESPONSEBODY');
              return responseBody;
            }

            if (response.status >= HttpStatus.SERVER_ERROR) {
              return Promise.reject({
                type: 'ServerError',
                status: response.status,
                body: responseBody,
              });
            }
            if (response.status < HttpStatus.SERVER_ERROR) {
              return Promise.reject({
                type: 'ApplicationError',
                status: response.status,
                body: responseBody,
              });
            }
          });
      })
      .catch((err: any) => {
        return err.type
          ? Promise.reject(err)
          : Promise.reject({
              type: 'ConnectionRefused',
              status: HttpStatus.SERVER_ERROR,
              body: 'Check your internet connection',
            });
      });
  }
}

const instance = new Api();

export default instance;
