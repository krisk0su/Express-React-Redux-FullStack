import React from "react";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

const Comment = ({ comment, commentatorName }) => {
  return (
    <ListGroupItem>
      <ListGroupItemHeading>{commentatorName}</ListGroupItemHeading>
      <ListGroupItemText>{comment}</ListGroupItemText>
    </ListGroupItem>
  );
};

export default Comment;
