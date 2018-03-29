import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const CardExampleWithAvatar = (props) => (
    <Card>
        <CardHeader
            title={props.title}
            subtitle="Subtitle"
            avatar="http://i.pravatar.cc/300"
        />
        <CardTitle title="Card title" subtitle="Card subtitle"/>
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
