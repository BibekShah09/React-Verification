import { compose } from 'recompose';

import Verification from './Verfication';

import verificationApi from './verificationApi';

import apiInterceptor from '../../api/api.interceptor';

export default compose(apiInterceptor({ ...verificationApi }))(Verification);
