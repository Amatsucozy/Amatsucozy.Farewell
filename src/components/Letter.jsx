import React from "react";

function Letter({ group, isVisible, onClose }) {
  return (
    <div id="letterOverlay" onClick={onClose}>
      <div className="letter-content" onClick={(e) => e.stopPropagation()}>
        <p className="category-name">{group?.name}</p>
        <div className="w-24 h-[1px] bg-gray-200 mx-auto my-10"></div>
        <h2 className="motto-display">{group ? `"${group.motto}"` : ""}</h2>
        <p className="text-5xl text-gray-300 mt-8 font-bold">𝄐</p>
        <div className="close-hint" onClick={onClose}>
          Return to Tabletop
        </div>
      </div>
    </div>
  );
}

export default Letter;
