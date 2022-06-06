import React, { useContext } from 'react';
import { TodoContext } from "./Context/TodoContext";

function Alert() {

  const context = useContext(TodoContext);

  const { alert } = context
  return (
    <div>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert" style={{ position: "fixed", zIndex: "999" }}>
          {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
