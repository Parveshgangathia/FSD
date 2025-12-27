import React from "react";

function ExpensiveItem({ value }) {
  console.log("Rendered ExpensiveItem");
  return (
    <div className="p-2 border rounded">
      Value: {value}
    </div>
  );
}

export default React.memo(ExpensiveItem);
