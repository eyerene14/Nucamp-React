import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import {
    Row, Col, Card, CardImg, CardText, Label,
    CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            rating: '',
            author: '',
            text: '',
            touched: {
                rating: false,
                author: false,
                text: ''
            }

        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {

        return (
            <React.Fragment>
                <div>
                    <span className="navbar-text ml-auto">
                        <Button outline color="white" onClick={this.toggleModal}><i className="fa fa-pencil" />Submit Comment</Button>
                    </span>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <div className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="author" md={3}>Your Name</Label>
                                    <Col>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                minLength: minLength(2),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="text" md={2}>Comment</Label>
                                    <Col>
                                        <Control.textarea model=".text" id="text" name="text"
                                            rows="6"
                                            className="form-control"
                                        />
                                    </Col>
                                </div>
                                <div className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                            Submit
                                    </Button>
                                    </Col>
                                </div>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}

function RenderCampsite({ campsite }) {
    if (campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    return <div />;
}

function RenderComments({ comments, addComment, campsiteId }) {
    return (<div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(c => {
            return (
                <Row className="spacer mb-3">
                    {c.text}
                    <br></br>
                        --{c.author}, {''}
                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}
                    <br></br>
                </Row>
            )
        })}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
    </div>);
}

function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/Directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <Row md="5">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
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