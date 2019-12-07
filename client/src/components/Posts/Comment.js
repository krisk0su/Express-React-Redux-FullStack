import React from "react";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

const Comment = ({ comment, name }) => {
  return (
    <ListGroupItem className="m-2">
      <ListGroupItemHeading className="text-center">
        Comment Author: {name}
      </ListGroupItemHeading>
      <ListGroupItemText>{comment}</ListGroupItemText>
    </ListGroupItem>
  );
};

export default Comment;
