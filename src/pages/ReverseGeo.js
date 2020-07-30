import React, { useState, useEffect} from "react";
import { connect } from 'react-redux';

import { Card, Form, FormControl, Button , Col, Jumbotron} from 'react-bootstrap';
import ReactJson from 'react-json-view'

import BasicForm from '../components/BasicForm'
import DynamicForm from '../components/DynamicForm'
import MapComp  from '../components/MapComp'


const ReverseGeo = ({responseRG}) => {
    
    let [jsonResponse, setJsonResponse] = useState({});

    useEffect(() => {
       setJsonResponse(responseRG)
    }, [responseRG])


    return (
        <div className="container fluid">
            <div className="row">
                <div className="col-md-12">
                <Card className="main-card-view">
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Barikoi RestClient</Card.Subtitle>
                        <Jumbotron> 
                            <div>
                            <BasicForm/>
                            </div>
                            <br/>
                            <div>
                            <DynamicForm/>
                            </div>
                            
                        </Jumbotron>

                        <div className="row">
                            <div className="col-md-6">
                               <div className="code-view">
                                    <ReactJson src={jsonResponse}  theme="rjv-default"/>
                               </div>
                            </div>
                            <div className="col-md-6">
                                <MapComp/>
                            </div>
                        </div>
                           
                    </Card.Body>
                </Card>
                </div>

            </div>

            
        </div>
    )
}


const mapStateToProps = (state) => ({
    responseRG: state.baseform.responseRG
});

export default connect(mapStateToProps, null)(ReverseGeo)
