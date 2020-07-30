import React, { Fragment, useState, useEffect} from "react";
import { Form, Button , Col} from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


import { connect } from 'react-redux';
import { getFieldPairs } from '../actions/dformAction';
import { callReverseGeo, passURLParams } from '../actions/bformAction';

import { getJsonFromUrl, getUrlParamFromJson, setRequestObj} from '../factory/supportFactory'


const BasicForm = ({ fieldPairs, getPairs, sendRequest, passParams, urlParams}) => {
    const SEARCH_URI = 'https://api.github.com/search/users';


    useEffect(() => {
        // getPairs()
        generateCompleteUrl(fieldPairs)
    }, [fieldPairs])
    
    const [baseUrl, setBaseUrl] = useState('https://barikoi.xyz/v1/api/search/reverse/MTc6UkFRMUJJSVlLVQ==/geocode?');
    const [completeUrl, setCompleteUrl] = useState(baseUrl);
    const [requestMethod, setRequestMethod] = useState('GET');
    const [reqObj, setReqObj] = useState({reqURL: baseUrl, reqConfig:{
        method: 'GET',
        header:{
            'content-type': 'application/x-www-form-urlencoded'
        },
    }})

    const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          login: i.login,
        }));

        setOptions(options);
        setIsLoading(false);
      });
  };

    
    const handleUrlInputBlur = (event) => {
    
        // if(event.target.value.trim() === completeUrl.trim()) return
        
        let temp_url_param_array = []
        setCompleteUrl(event.target.value)
        let url_param_obj = getJsonFromUrl(event.target.value)
        setBaseUrl(url_param_obj.api_url+'?')
        for (var property in url_param_obj.json_param) {
            temp_url_param_array.push({'key': property, 'value': url_param_obj.json_param[property]})
        }
        let urlParam = getUrlParamFromJson(temp_url_param_array)
        let tempReqObj = setRequestObj(requestMethod, url_param_obj.api_url+'?', urlParam, temp_url_param_array)
        setReqObj(tempReqObj)
        console.log(temp_url_param_array)
        passParams(temp_url_param_array)
        

    };

    const generateCompleteUrl = (argFieldPairs) => {
        let urlParam = getUrlParamFromJson(argFieldPairs) 
        setCompleteUrl(baseUrl+urlParam)
        let tempReqObj = setRequestObj(requestMethod, baseUrl, urlParam, argFieldPairs)
        setReqObj(tempReqObj)
        sendRequest(tempReqObj)
    }

   
    const selectRequestMethod = (event) => {
        setRequestMethod(event.target.value);
        let urlParam = getUrlParamFromJson(urlParams) 
        setCompleteUrl(baseUrl+urlParam)
        let tempReqObj = setRequestObj(event.target.value, baseUrl, urlParam, urlParams)
        setReqObj(tempReqObj)
        // let temPMethod = event.target.value
        // setReqObj(prevState => {
        //     prevState.reqConfig.method = temPMethod
        //     return({
        //         ...prevState
        //     })
        // })
    }

    
    return (
        <div>
            <Form id="bform">
                <Form.Row>
                    <Col>
                        <Form.Control as="select" onChange={(event)=> selectRequestMethod(event)} custom>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="DELETE">DELETE</option>
                                <option value="UPDATE">UPDATE</option>
                                <option value="PATCH">PATCH</option>
                        </Form.Control>
                    </Col>
                    <Col xs={7}>
                        <Form.Control as="input" placeholder="url" onChange={event => handleUrlInputBlur(event)}  value={completeUrl}/>
                    </Col>
                    <Col>
                    <Button variant="primary" onClick={()=>sendRequest(reqObj)}>Send</Button>{' '}
                    </Col>
                    <Col>
                    <Button variant="outline-dark">Params</Button>
                    </Col>
                </Form.Row>
            </Form>
            {/* <AsyncTypeahead
      id="async-example"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: '24px',
              marginRight: '10px',
              width: '24px',
            }}
          />
          <span>{option.login}</span>
        </Fragment>
      )}
    /> */}
        </div>
    )
};

const mapStateToProps = (state) => ({
    fieldPairs: state.dynamicform.fieldPairs,
    responseRG: state.baseform.responseRG,
    urlParams: state.baseform.urlParams
});

const mapDispatchToProps = (dispatch) => ({
    getPairs: () => dispatch(getFieldPairs()),
    sendRequest: (reqObj) => { dispatch(callReverseGeo(reqObj))}, 
    passParams: (urlParams) => {
        dispatch(passURLParams(urlParams));
    },
    
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicForm)
