import React from 'react';
import {connect} from 'dva';
import SideBar from './components/Sidebar/index.jsx';


// class layout extends React.Component {

//     handlerEmployeeLogin = formData => {
//         this.props.dispatch({type: "auth/loginMember", payload: {formData}})
//     };

//   render() {
//       return (
//         <div>
//           <SideBar></SideBar>
//         </div>
//       )
//     }
// }

// layout.propTypes = {};

// export default connect()(layout);
function LayoutMain({children, user, width= 990}) {
  return (
      <div style={{minWidth: width + 10}}>
          <SideBar></SideBar>
          <div style={{width: width}}>
              {children}
          </div>
      </div>
  );
}

function mapStateToProps({user}) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(LayoutMain);