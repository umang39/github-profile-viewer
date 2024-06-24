import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { EmptySectionprops, useEmptyBioStyle } from "@components/index";

const EmptySection = (props: EmptySectionprops): ReactElement => {
  const emptyBio = useEmptyBioStyle();
  const { title } = props;
  return (
    <Typography className={emptyBio.text} variant="h2" fontWeight={400}>
      Oops ! You have no {title}
    </Typography>
  );
};

export default EmptySection;
