import React, { ReactElement } from "react";
import { Avatar } from "@material-ui/core";
import { Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { socialCardInterface, useSocialStyle } from "@components/index";
import MailIcon from "@mui/icons-material/Mail";
import GitHubIcon from "@mui/icons-material/GitHub";
import { theme } from "@src/theme";
import { ButtonComponent, EmptySection } from "@components/index";

const SocialCard = (props: socialCardInterface): ReactElement => {
  const { user, followersHandler, followHandler, isFollow } = props;
  const {
    avatar_url,
    login,
    location,
    followers,
    following,
    bio,
    email,
    html_url,
    blog,
  } = user;
  const socialStyles = useSocialStyle();
  return (
    <>
      <Grid
        container
        style={{ width: "70%" }}
        className={socialStyles.container}
        boxShadow={10}
      >
        <Grid item md={6} sm={12}>
          <Grid container justifyContent="center">
            <Grid item sm={12}>
              <Grid container justifyContent="center">
                <Grid item xs={12} className={socialStyles.avatarWrapper}>
                  <Avatar
                    alt="Cindy Baker"
                    src={avatar_url}
                    className={socialStyles.avatar}
                  />
                </Grid>
                <Grid item xs={12} className={socialStyles.follow}>
                  <Typography
                    marginTop={1}
                    fontSize={theme.spacing(3.75)}
                    className={(socialStyles.head, "line-break")}
                    fontWeight={550}
                  >
                    {login}
                  </Typography>
                </Grid>

                <Grid item xs={12} className={socialStyles.follow}>
                  {location && <Typography variant="h5">{location}</Typography>}
                </Grid>
                {localStorage.getItem("username") !== login && !isFollow ? (
                  <Grid
                    item
                    xs={12}
                    className={socialStyles.followBtn}
                    marginY={1}
                  >
                    <ButtonComponent
                      type="button"
                      value="Follow"
                      id={login}
                      btnHandler={followHandler}
                      isDisabled={false}
                    />
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid
                  item
                  sm={6}
                  xs={12}
                  className={socialStyles.followContainer}
                >
                  <Grid container className={socialStyles.followerContainer}>
                    <Grid item xs={12}>
                      <Typography variant="h3" className={socialStyles.follow}>
                        {followers}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h4"
                        className={(socialStyles.follow, socialStyles.follower)}
                        onClick={(e: React.SyntheticEvent) => {
                          return followersHandler(e, login);
                        }}
                      >
                        Followers
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sm={6}
                  xs={12}
                  className={socialStyles.followContainer}
                >
                  <Grid container>
                    <Grid item xs={12} className={socialStyles.follow}>
                      <Typography variant="h3">{following}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" className={socialStyles.follow}>
                        Following
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid container marginTop={1}>
                    <Grid item md={3} xs={6}>
                      <Typography>
                        <Link href={html_url} color="inherit">
                          <GitHubIcon
                            id="github"
                            style={{
                              fontSize: theme.spacing(3),
                            }}
                          />
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid md={3} xs={6} item>
                      <Typography>
                        {email && (
                          <Link href={`mailto:${email}`} color="inherit">
                            <MailIcon
                              id="mail"
                              style={{
                                fontSize: theme.spacing(3),
                              }}
                            />
                          </Link>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                fontSize={theme.spacing(3.75)}
                fontWeight={550}
                className={socialStyles.head}
              >
                Bio
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography fontSize={15} className="line-break">
                  {bio ? bio : <EmptySection title="bio" />}
                </Typography>
              </Box>
            </Grid>
            {blog && (
              <>
                <Grid item xs={12} marginTop={4}>
                  <Typography
                    fontSize={theme.spacing(3.75)}
                    fontWeight={550}
                    className={socialStyles.head}
                  >
                    Blog
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography fontSize={15} className="line-break">
                      {blog}
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SocialCard;
