import * as ActionTypes from '../utils/constants/actionTypes';

import configureStore from './index';

describe('Store', () => {
  const nodes = {
    list: [
      { url: 'a.com', online: false, name: null, loading: false },
      { url: 'b.com', online: false, name: null, loading: false },
      { url: 'c.com', online: false, name: null, loading: false },
      { url: 'd.com', online: false, name: null, loading: false }
    ]
  };

  const blocks = [
    {
      "id": "5",
      "type": "blocks",
      "attributes": {
        "index": 1,
        "timestamp": 1530679678,
        "data": "The Human Torch",
        "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
        "hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc="
      }
    },
    {
      "id": "6",
      "type": "blocks",
      "attributes": {
        "index": 2,
        "timestamp": 1530679684,
        "data": "is denied",
        "previous-hash": "oHkxOJWOKy02vA9r4iRHVqTgqT+Afc6OYFcNYzyhGEc=",
        "hash": "9xr57PW8RVzeOniNP2lPVzAOu97x12mpDgjv70z5vo4="
      }
    },
  ]


  it('should display results when necessary data is provided', () => {
    const store = configureStore({ nodes });

    const actions = [
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: { node_name: 'alpha' } },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: { node_name: 'beta' } },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: { node_name: 'gamma' } },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[2], res: { node_name: 'delta' } },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[1], res: { node_name: 'epsilon' } },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: { node_name: 'zeta' } },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: { node_name: 'eta' } },
      { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodes.list[0], res: { node_name: 'theta' } },
      { type: ActionTypes.FETCH_BLOCKS_SUCCESS, payload: blocks },
    ];
    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = {
      nodes: {
        list: [
          { url: 'a.com', online: true, name: 'theta', loading: false },
          { url: 'b.com', online: true, name: 'epsilon', loading: false },
          { url: 'c.com', online: true, name: 'delta', loading: false },
          { url: 'd.com', online: false, name: null, loading: false }
        ]
      },
      blocks: {
        blocks,
        requestStatus: "resolved",
      }
    };
    expect(actual).toEqual(expected);
  });
});
