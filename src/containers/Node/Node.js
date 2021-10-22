/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { fetchBlocks } from '../../store/actions/blocks/blocks';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../../utils/constants/colors";
import Status from "../../components/Status";
import Block from "../../components/Block";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const dispatch = useDispatch();

  const { blockState } = useSelector((state) => ({
    blockState: state.blocks,
  }));

  const { requestStatus } = useSelector((state) => ({ requestStatus: state.blocks?.requestStatus }));

  const toggleAndFetchNewData = () => {
    toggleNodeExpanded(node);
    dispatch(fetchBlocks(node));
  };

  const renderBlocks = useMemo(() => {
    if (requestStatus === "resolved") {
      return (
        blockState.blocks.map((block) => (
          <Block data={block?.attributes?.data} id={block?.id} />
        ))
      );
    } else if (requestStatus === "rejected") {
      return <p>No data found</p>;
    }
    return <p>Loading...</p>
  }, [requestStatus])

  const classes = useStyles();
  return (
    <Accordion
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleAndFetchNewData()}
    >
      <AccordionSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {renderBlocks}
      </AccordionDetails>
    </Accordion>
  );
};



const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  accordionDetails: {
    display: "flex",
    flexDirection: "column",
  }
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;

