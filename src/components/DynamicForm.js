import React, { useState, Fragment , useEffect} from "react";

import { connect } from 'react-redux'
// import { initGeo } from '../actions/mapAction'
import { passFieldPairs } from '../actions/dformAction'
import { getURLParams } from '../actions/bformAction'


const DynamicForm =  ({ latlng, passPair, urlParams, getParams })  => {


    useEffect(() => {
      generateLatLonField()
    }, [latlng])

    useEffect(() => {
      setInputFields(urlParams);
    }, [urlParams])

    const [inputFields, setInputFields] = useState([
      {'key': 'latitude', 'value': 23.7985508}, {'key': 'longitude', 'value': 90.3654215}
    ]);

   
  
    const handleAddFields = () => {
      const values = [...inputFields];
      values.push({ key: '', value: '' });
      setInputFields(values);
      passPair(values)
    };
  
    const handleRemoveFields = index => {
      const values = [...inputFields];
      (values.length > 1)? values.splice(index, 1): console.log('dont be a jerk')
      
      setInputFields(values);
      passPair(values)
    };
  
    const handleInputChange = (index, event) => {
      const values = [...inputFields];
      if (event.target.name === "key") {
        values[index].key = event.target.value;
      } else {
        values[index].value = event.target.value;
      }
  
      setInputFields(values);
      passPair(values)
    };
  
    // const handleSubmit = e => {
    //   e.preventDefault();
    //   console.log(latlng)
    //   console.log("inputFields", inputFields);
    //   passFieldPairs(inputFields)
    //   passPair(inputFields)
    // };


    const generateLatLonField = () => {
      let hasLat = false;
      let hasLng = false;
      const values = [...inputFields];
      values.map((value)=>{
        
        if(value.key==='latitude'){
          value.value = latlng.lat;
          hasLat = true;
        }
        if(value.key==='longitude'){
          value.value = latlng.lng;
          hasLng = true
        }
      })  
      // (!hasLat)? values.unshift({'key':'latitude', 'value': latlng.lat}):null
      // (!hasLng)? values.unshift({'key':'longitude', 'value': latlng.lng}):null
      // const values = [...inputFields];
      //   values.map((value)=>{
      //     if(value.key==='latitude')value.value = latlng.lat;
      //     if(value.key==='longitude')value.value = latlng.lng;
      //   })
        setInputFields(values);
        passPair(values)
    }
  
    return (
      <>  
        <form id='dfrom'>
    
          <div className="form-row">
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <div className="form-group col-sm-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="key"
                    id="key"
                    name="key"
                    value={inputField.key}
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
                <div className="form-group col-sm-7">
                  <input
                    type="text" 
                    className="form-control" 
                    placeholder="Value"
                    id="value"
                    name="value"
                    value={inputField.value}
                    onChange={event => handleInputChange(index, event)}
                  />
                </div>
                <div className="form-group col-sm-2">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleAddFields()}
                  >
                    +
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
          {/* <div className="submit-button">
            <button
              className="btn btn-primary mr-2"
              type="button"
              onClick={(event)=>passPair(event, inputFields)}
            >
              SET
            </button>
          </div> */}
          {/* <br/>
          <pre>
            {JSON.stringify(inputFields, null, 2)}
          </pre> */}
        </form>
      </>
    );
  };

const mapStateToProps = state => ({
    latlng: state.map.latlng,
    urlParams: state.baseform.urlParams
})

const mapDispatchToProps = (dispatch) => ({
  // passFieldPairs: (fieldPairs) => dispatch(passFieldPairs(fieldPairs)),
  passPair: (fieldPairs) => {
    dispatch(passFieldPairs(fieldPairs));
  },
  getParams: () => dispatch(getURLParams()),

});

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);