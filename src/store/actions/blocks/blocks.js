import fetch from 'cross-fetch';
import * as Types from '../../../utils/constants/actionTypes';
import * as RequestStatus from '../../../utils/constants/request';


const fetchBlocksStart = (payload) => {
  return {
    type: Types.FETCH_BLOCKS_START,
    payload,
    requestStatus: RequestStatus.REQUEST_NOT_STARTED,
  };
};

const fetchBlockSuccess = (payload) => {
  return {
    type: Types.FETCH_BLOCKS_SUCCESS,
    payload,
    requestStatus: RequestStatus.REQUEST_RESOLVED,
  };
};

const fetchBlockFailure = (payload) => {
  return {
    type: Types.FETCH_BLOCKS_FAILURE,
    error: payload,
    requestStatus: RequestStatus.REQUEST_REJECTED,
  };
};

export const fetchBlocks = (node) => {
  return async (dispatch) => {
    try {

      dispatch(fetchBlocksStart(node));
      const response = await fetch(`${node.url}/api/v1/blocks`);

      if (response.status >= 400) {
        const errorStatus = `ERROR ${response.status}`;
        dispatch(fetchBlockFailure(errorStatus));
        return;
      } else {
        const res = await response.json();

        dispatch(fetchBlockSuccess(res.data))
      }
    } catch (error) {
      dispatch(fetchBlockFailure(error));
    }
  }
}

