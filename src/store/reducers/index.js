import { combineReducers } from 'redux';
import nodes from './nodes/nodes';
import blocks from './blocks/blocks';

const rootReducer = combineReducers({
  nodes,
  blocks
});

export default rootReducer;
