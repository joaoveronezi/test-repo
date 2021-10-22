import React from 'react';
import PropTypes from "prop-types";
import "./Block.style.css";


const Block = ({ data, id }) => {
  return (
    <div className="block-wrapper">
      <div className="id-wrapper">
        <span>{id}</span>
      </div>
      <div className="text-wrapper">
        <p>{data}</p>
      </div>
    </div>
  )
}
Block.propTypes = {
  id: PropTypes.string,
  data: PropTypes.string,
};


export default Block;