import { CHECK_NODE_STATUS_START, CHECK_NODE_STATUS_SUCCESS, CHECK_NODE_STATUS_FAILURE } from '../../../utils/constants/actionTypes';

export const INITIAL_STATE = {
  nodes: {
    list: [
      {
        url: "https://thawing-springs-53971.herokuapp.com",
        online: false,
        name: "Thawing Springs",
        loading: false,
      },
      {
        url: "https://secret-lowlands-62331.herokuapp.com",
        online: false,
        name: "Secret Lowlands",
        loading: false,
      },
      {
        url: "https://calm-anchorage-82141.herokuapp.com",
        online: false,
        name: "Secret Lowlands",
        loading: false,
      },
      {
        url: "http://localhost:3002",
        online: false,
        name: "Node 4",
        loading: false,
      },
    ],
  },
};


export default function nodesReducer(state = INITIAL_STATE.nodes, action) {
  let list, nodeIndex;
  switch (action.type) {
    case CHECK_NODE_STATUS_START:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            loading: true
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_SUCCESS:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: true,
            name: action.res.node_name,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    case CHECK_NODE_STATUS_FAILURE:
      list = state.list;
      nodeIndex = state.list.findIndex(p => p.url === action.node.url);
      if (nodeIndex >= 0) {
        list = [
          ...state.list.slice(0, nodeIndex),
          {
            ...state.list[nodeIndex],
            online: false,
            loading: false
          },
          ...state.list.slice(nodeIndex + 1)
        ];
      }
      return {
        ...state,
        list
      };
    default:
      return state;
  }
}
