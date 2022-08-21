import { has } from 'ramda';
import { RequestResponseObject } from 'utils/types';

export const testShouldSendHeadersQuery = 'shouldSendHeaders';

const withSendHeaders = async <
  CustomRequestResponseObject extends RequestResponseObject,
>(
  requestResponseObject: CustomRequestResponseObject,
): Promise<CustomRequestResponseObject> => {
  if (requestResponseObject.response.headersSent) {
    return requestResponseObject;
  }

  const shouldSendHeaders = has(
    testShouldSendHeadersQuery,
    requestResponseObject.request.query,
  );

  if (shouldSendHeaders) {
    requestResponseObject.response
      .status(200)
      .json({ message: 'Headers set by send headers test middleware.' });
  }

  return requestResponseObject;
};

export default withSendHeaders;
