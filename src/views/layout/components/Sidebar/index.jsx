import React from 'react';
import {connect} from 'dva';
import { Collapse } from 'antd';
const { Panel } = Collapse;


class layout extends React.Component {

    handlerEmployeeLogin = formData => {
        this.props.dispatch({type: "auth/loginMember", payload: {formData}})
    };

  render() {
    function callback(key) {
      console.log(key);
    }
    
    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;
    
      return (
          <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
          </Collapse>
      )
    }
}

layout.propTypes = {};

export default connect()(layout);