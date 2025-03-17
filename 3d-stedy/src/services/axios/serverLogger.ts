import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ENV } from './apiConfig';

/**
 * If SHOW_LOG = false, stop API logging
 */
const SHOW_LOG = false;

/**
 * Describe request API logging
 *
 * @param config AxiosRequestConfig
 */
function describeRequest(config: AxiosRequestConfig<any>) {
  if (!SHOW_LOG || ENV.TYPE !== 'dev') {
    return;
  }
}

/**
 * Describe success response API logging
 *
 * @param response AxiosResponse
 */
function describeSuccessResponse(response: AxiosResponse<any, any>) {
  if (!SHOW_LOG || ENV.TYPE !== 'dev') {
    return;
  }
}

/**
 * Describe error response API logging
 *
 * @param error any
 */
function describeErrorResponse(error: any) {
  if (!SHOW_LOG || ENV.TYPE !== 'dev') {
    return;
  }
}

export const requestLogger = (config: AxiosRequestConfig) => {
  return config;
};

export const responseLogger = (response: AxiosResponse) => {
  return response;
};

export const errorLogger = (error: AxiosError) => {
  if (error.response) {
    // ... existing code ...
  } else if (error.request) {
    // ... existing code ...
  } else {
    // ... existing code ...
  }
  return Promise.reject(error);
};

const Logger = {
  describeRequest,
  describeSuccessResponse,
  describeErrorResponse,
};

export default Logger;
