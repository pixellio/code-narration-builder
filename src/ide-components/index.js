

import React  from "react"
import st from "./index.sass"
import {PlaySquareOutlined} from "@ant-design/icons"
// Function to check if the user has 'editor' permission
const hasEditorPermission = (user) => {
    return user && user.roles.includes('editor');
  };
  
  // Higher Order Component for authorization
  const withAuthorization = (WrappedComponent) => {
    return class WithAuthorization extends React.Component {
      render() {
        // Assuming user data is passed as a prop
        const { user, ...rest } = this.props;
  
        // Check if user has 'editor' permission
        if (hasEditorPermission(user)) {
          // Render the original component with its props
          return <WrappedComponent {...rest} />;
        } else {
          // Render a message or another component for unauthorized access
          return <div>You do not have permission to access this feature.</div>;
        }
      }
    };
  };
  
  // Example component that requires 'editor' permission
  const EditOptionsComponent = ({ user }) => {
    return (
      <div className="editor"> 
        <PlaySquareOutlined twoToneColor="#4ff123" style={{ fontSize: '32px', color: "white" }} onClick={() => {
          alert("todo")
        }}/>
      </div>
    );
  };
  
  // Wrap the component with the authorization HOC
  const AuthorizedEditOptionsComponent = withAuthorization(EditOptionsComponent);

  export {
    AuthorizedEditOptionsComponent
  } 
  