import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExampleWithAvatar = (props) => (
    <Card>
        <CardHeader
            title="Test User"
            subtitle="User subtitle"
            avatar="http://i.pravatar.cc/300"
        />
        <CardTitle title={props.title} subtitle="Post tags"/>
        <CardText>
            {props.body}
        </CardText>
        <CardActions>
            <FlatButton label="Upvote"/>
            <FlatButton label="Downvote"/>
        </CardActions>
    </Card>
);

export default CardExampleWithAvatar;
