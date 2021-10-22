import * as ActionTypes from "../../../utils/constants/actionTypes";
import * as ActionCreators from "./blocks";
import * as RequestStatus from "../../../utils/constants/request";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Blocks Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

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

  // it("should fetch the blocks", async () => {
  //   mockFetch.mockReturnValueOnce({
  //     status: 200,
  //     json() {
  //       return Promise.resolve({ blocks: block })
  //     }
  //   })

  //   await ActionCreators.fetchBlocks(node)(dispatch);
  //   const expected = [
  //     {
  //       type: ActionTypes.FETCH_BLOCKS_START,
  //       requestStatus: RequestStatus.REQUEST_NOT_STARTED,
  //       payload: node,
  //     },
  //     {
  //       type: ActionTypes.FETCH_BLOCKS_SUCCESS,
  //       requestStatus: RequestStatus.REQUEST_RESOLVED,
  //       payload: block,
  //     }
  //   ]

  //   expect(dispatch.mock.calls.flat()).toEqual(expected);
  // })


  it("should fail to fetch the blocks", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.fetchBlocks(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.FETCH_BLOCKS_START,
        requestStatus: RequestStatus.REQUEST_NOT_STARTED,
        payload: node,
      },
      {
        type: ActionTypes.FETCH_BLOCKS_FAILURE,
        requestStatus: RequestStatus.REQUEST_REJECTED,
        error: "ERROR 400",
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });



})