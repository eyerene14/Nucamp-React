import React from 'react';
import Directory from './DirectoryComponent';
import { Container, Row, Col, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite({ campsite }) {
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

function RenderComments({ comment }) {
    return (<div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comment.map(c => {
            return (
                <Row className="spacer">
                    {c.text}
                    <br></br>
                        --{c.author}, {''}
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}
                    <br></br>
                </Row>
            )
        })}
    </div>);
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <Row md="5">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comment={props.comments} />
                    {/*{this.renderCampsite(this.props.campsites)}
                {this.renderComments(this.props.campsites)}*/}
                </Row>
            </div>
        );
    }
    return <div />;
}

{/* 
class CampsiteInfo extends Component {

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
}*/}

export default CampsiteInfo;