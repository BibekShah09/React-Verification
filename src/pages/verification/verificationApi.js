import * as appConstant from '../../config';
import * as apiCall from '../../api/api.client';

const TOKEN_VERIFICATION_URL = `${appConstant.baseUrl}/code-verification`;

const verificationApi = {
  verifyToken: (query) => apiCall.post(TOKEN_VERIFICATION_URL, query),
};

export default verificationApi;
