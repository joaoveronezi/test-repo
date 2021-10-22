import {
  FETCH_BLOCKS_START,
  FETCH_BLOCKS_SUCCESS,
  FETCH_BLOCKS_FAILURE
} from '../../../utils/constants/actionTypes';
import * as RequestStatus from '../../../utils/constants/request';

export const INITIAL_STATE = {
  blocks: [],
  requestStatus: RequestStatus.REQUEST_NOT_STARTED,
}

const blocksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BLOCKS_START:
      return {
        ...state,
        requestStatus: RequestStatus.REQUEST_PENDING,
      }
    case FETCH_BLOCKS_SUCCESS:
      return {
        ...state,
        blocks: action.payload,
        requestStatus: RequestStatus.REQUEST_RESOLVED,
      }
    case FETCH_BLOCKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        requestStatus: RequestStatus.REQUEST_REJECTED,
      }
    default:
      return state;
  }
}

export default blocksReducer;