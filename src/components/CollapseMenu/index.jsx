// import React, { useState } from "react";

// export default function CollapseMenu({ title, children, isOpen, onToggle }) {
//   return (
//     <div className="collapse-container">
//       <button
//         className="collapse-button"
//         onClick={onToggle}
//         aria-expanded={onToggle}>
//         {title}
//       </button>
//       {isOpen && <div className="collapse-content">{children}</div>}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function CollapseMenu({ title, children, isOpen = false, onToggle, types }) {
  const [show, setShow] = useState(isOpen);

  

  const handleCollapse = () => {
    setShow(!show);
    onToggle && onToggle(!show);
  };

  const { currentPage, search, type, element, equipmentType, stat, valueOperator, value } = types;
  useEffect(() => {
    setShow(false);
  }, [currentPage, search, type, element, equipmentType, stat, valueOperator, value]);

  return (
    <div className="collapse-container">
      <button
        className={`collapse-button ${isOpen ? "open" : ""}`}
        onClick={handleCollapse}
        aria-expanded={isOpen}>
        {title}
      </button>
      {show && <div className="collapse-content">{children}</div>}
    </div>
  );
}
