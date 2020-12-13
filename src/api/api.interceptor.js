import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { getDisplayName } from '../utils/component';

/**
 * Refer here for HOC : https://facebook.github.io/react/docs/higher-order-components.html
 * @param apiList: APIs in object key format
 * @returns {function(*=): RequestTracker}
 */
export default function withRequestTracker(apiList = {}) {
  return (SourceComponent) => {
    class RequestTracker extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loadingCounter: 0,
          error: '',
        };

        // Prevent React set state on unmounted component.
        // eslint-disable-next-line no-underscore-dangle
        this._isMounted = false;
        this.sourceComponent = React.createRef();
      }

      componentDidMount() {
        // eslint-disable-next-line no-underscore-dangle
        this._isMounted = true;
      }

      componentWillUnmount() {
        // eslint-disable-next-line no-underscore-dangle
        this._isMounted = false;
      }

      onApiRequestStart = () => {
        // eslint-disable-next-line no-underscore-dangle
        if (this._isMounted) {
          this.setState((state) => ({
            loadingCounter: state.loadingCounter + 1,
            error: '',
          }));
        }
      }

      onApiRequestSuccess = () => {
        // eslint-disable-next-line no-underscore-dangle
        if (this._isMounted) {
          this.setState((state) => ({
            loadingCounter: state.loadingCounter - 1,
          }));
        }
      };

      onApiRequestFailure = (error) => {
        // eslint-disable-next-line no-underscore-dangle
        if (this._isMounted) {
          this.setState((state) => ({
            loadingCounter: state.loadingCounter - 1,
            error,
          }));
        }
      };

      /**
       * intercept a request
       * @param requestName: API request name
       * @returns API request with interceptors and callback
       */
      getApiRequestWithInterceptor = (requestName) => {
        // eslint-disable-next-line max-len
        const apiRequestWithInterceptor = (variables, { onSuccess, onFailure } = {}, event = null) => {
          if (event) {
            event.preventDefault();
          }

          if (!requestName) {
            return;
          }

          this.onApiRequestStart();

          // eslint-disable-next-line consistent-return
          return apiList[requestName](variables)
            .then((response) => {
              this.onApiRequestSuccess();

              if (onSuccess) {
                onSuccess(response);
              }

              return Promise.resolve(response);
            })
            .catch((error) => {
              this.onApiRequestFailure(error);

              if (onFailure) {
                onFailure(error);
              }

              return Promise.reject(error);
            });
        };

        return apiRequestWithInterceptor;
      };

      getAPIRequestListWithInterceptor = () => {
        const apiRequestWithInterceptor = {};

        Object.keys(apiList).forEach((api) => {
          apiRequestWithInterceptor[api] = this.getApiRequestWithInterceptor(api);
        });

        return apiRequestWithInterceptor;
      };

      render() {
        const { loadingCounter, error } = this.state;
        const { ...oldProps } = this.props;

        const requestObjectWithTracker = this.getAPIRequestListWithInterceptor();

        const newProps = {
          serverResponseWaiting: loadingCounter >= 1,
          serverResponseError: error,
          ...requestObjectWithTracker,
        };

        return (
          <SourceComponent
            ref={this.sourceComponent}
            {
              ...oldProps
            }
            {
              ...newProps
            }
          />
        );
      }
    }

    RequestTracker.displayName = `LoadingAndError(${getDisplayName(SourceComponent)})`;

    hoistNonReactStatic(RequestTracker, SourceComponent);

    return RequestTracker;
  };
}
