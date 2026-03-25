import React from "react";

function Envelope({
  group,
  isActive,
  isBlurred,
  isRevealed,
  password,
  setPassword,
  error,
  inputRef,
  onEnvelopeClick,
  onVerify,
}) {
  return (
    <div
      className={`envelope-container relative flex items-center justify-center ${
        isActive ? "is-active" : ""
      } ${isBlurred ? "is-blurred" : ""}`}
    >
      <div className="smoke-effect"></div>
      <div
        className={`envelope-group ${isActive ? "focused" : ""} ${
          isActive && isRevealed ? "revealed" : ""
        }`}
        style={{ "--rotation": `${group.rot}deg` }}
      >
        <div
          className="envelope-card"
          onClick={() => onEnvelopeClick(group.id)}
        >
          <div className="password-panel" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
              Unlock {group.name}
            </h3>
            <input
              ref={isActive ? inputRef : null}
              type="password"
              className={`input-style ${error && isActive ? "shake" : ""}`}
              placeholder="Enter Harmony"
              value={isActive ? password : ""}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onVerify(group.id)}
            />
            <div
              className={`text-[8px] text-red-700 ${
                error && isActive ? "" : "hidden"
              }`}
            >
              Incorrect.
            </div>
            <button
              onClick={() => onVerify(group.id)}
              className="gold-btn"
            >
              Verify
            </button>
          </div>
        </div>
        <div className="envelope-label">{group.name}</div>
      </div>
    </div>
  );
}

export default Envelope;
