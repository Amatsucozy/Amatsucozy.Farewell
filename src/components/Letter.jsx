import React from "react";

function Letter({ group, isVisible, onClose }) {
  return (
    <div id="letterOverlay" onClick={onClose}>
      <div className="letter-content" onClick={(e) => e.stopPropagation()}>
        <div className="letter-scroll-area">
          <p className="category-name">{group?.name}</p>
          <div className="w-24 h-[1px] bg-gray-200 mx-auto my-10 dividerLine"></div>
          <h2 className="motto-display">{group ? `"${group.motto}"` : ""}</h2>
          <p className="text-5xl text-gray-300 mt-8 font-bold ornament">𝄐</p>
          <div className="letter-body">
            {group?.body?.map((para, i) => (
              <p key={i} className="mb-6 last:mb-0">{para}</p>
            ))}
          </div>
          <footer className="letter-footer">
            {group?.actionLink && (
              <a href={group.actionLink} target="_blank" rel="noopener noreferrer" className="footer-btn">
                Order a drink
              </a>
            )}
            <div className="footer-btn" onClick={onClose}>
              Return
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Letter;
