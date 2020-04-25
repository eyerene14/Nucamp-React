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
            <div><Row>
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            </Row></div>
        );
        }
        return <div />;
    }

    render() {
        
        return (
            <div className="container">
                {this.renderCampsite(this.props.campsites)}
            </div>
        );
    }
}

export default CampsiteInfo;