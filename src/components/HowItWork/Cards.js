import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core/";
import { CardItem } from "./CardItems";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(20),
    background: 'linear-gradient(90deg, #1d3f5e, #5890c4)'
  },
  title: {
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  featureList: {
    padding: theme.spacing(2),
    borderRadius: 10,
  },
}));

export default function MediaCard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container spacing={3}
        direction="row"
        alignItems="center"
        justify="center"
      >
        {CardItem.map((elem) => (
          <Grid item md={3} xs={1}  key={CardItem.indexOf(elem)}>
            <Card>
              <CardContent backgroundColor="grey">
                <Typography variant="h5" component="h3" className={classes.title}>{elem.title}</Typography>
                <Typography className={classes.featureList}style={{backgroundColor:"#EDEEF7",}}>{elem.subtitle}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
<i class="fas fa-dice-one"></i>