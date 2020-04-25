import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { Container, Row, Col, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {


    campsiteNotNull(campsite) {
        if (campsite) {
            return (
                <div><Row></Row></div>
            );
        }
        return <div />;
    }

    renderCampsite(campsite) {
        if (campsite) {
            return (
                    <div className="col-md-5 m-1">
                        <Card>
                            <CardImg top src={campsite.image} alt={campsite.name} />
                            <CardBody>
                                <CardTitle>{campsite.name}</CardTitle>
                                <CardText>{campsite.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
            );
        }
        return <div />;
    }

    renderComments(c) {
        //const array1 = comment.comments;
        if (c) {
            return (<div className="col-md-5 m-1">
                <h4>Comments</h4>
                {c.comments.map(comment => {
                    return (
                        <Row className="spacer">
                            {comment.text}
                            <br></br>
                            --{comment.author},  
                             {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                             <br></br>
                        </Row>
                    )
                })}
            </div>);
        }
        return <div />;
    }

    render() {

        return (
            <div className="container">
                <Row md="5">
                {this.renderCampsite(this.props.campsites)}
                {this.renderComments(this.props.campsites)}
                </Row>
            </div>
        );
    }
}

export default CampsiteInfo;