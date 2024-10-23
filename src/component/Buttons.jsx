import PropTypes from "prop-types";
import "../App.css";

export function Buttons({ type, login, disabled, children }) {
  const types = type;
  return (
    <button
      disabled={disabled}
      className={types ? types : "btn"}
      onClick={login}
    >
      {children}
    </button>
  );
}

Buttons.propTypes = {
  type: PropTypes.string,
  login: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};
