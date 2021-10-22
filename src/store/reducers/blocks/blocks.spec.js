import * as ActionTypes from '../../../utils/constants/actionTypes';
import * as RequestStatus from '../../../utils/constants/request';
import reducer from './blocks';
import { INITIAL_STATE } from './blocks';

describe("Blocks reducer", () => {
  const getInitialState = () => {
    return INITIAL_STATE;
  };

  const node = {
    url: "https://thawing-springs-53971.herokuapp.com",
    online: true,
    name: "Test name",
  };

  const block = {
    "id": "5",
    "type": "blocks",
    "attributes": {
      "index": 1,
      "timestamp": 1530679678,
      "data": "The Human Torch",
      "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
      "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
    }
  }

  it("should be a empty array as initial state", () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  })


  it('should handle FETCH_BLOCKS_START', () => {
    const action = { type: ActionTypes.FETCH_BLOCKS_START, payload: node };
    const expected = {
      blocks: [],
      requestStatus: RequestStatus.REQUEST_PENDING,
    };

    expect(reducer(getInitialState(), action)).toEqual(expected);
  });

  it('should handle FETCH_BLOCKS_SUCCESS', () => {
    const state = {
      blocks: block,
    }
    const action = { type: ActionTypes.FETCH_BLOCKS_SUCCESS, payload: block };
    const expected = {
      blocks: block,
      requestStatus: RequestStatus.REQUEST_RESOLVED,
    };

    expect(reducer(state, action)).toEqual(expected);
  });

  it('should handle FETCH_BLOCKS_FAILURE', () => {
    const state = {
      error: "ERROR 400"
    };
    const action = {
      type: ActionTypes.FETCH_BLOCKS_FAILURE,
      payload: "ERROR 400",
    };
    const expected = {
      error: "ERROR 400",
      requestStatus: RequestStatus.REQUEST_REJECTED,
    };

    expect(reducer(state, action)).toEqual(expected);
  });
})