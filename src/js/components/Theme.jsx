import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Icon from "./Icon";

function Theme({ handleThemeSwitch, isDark }) {
  return (
    <div onClick={handleThemeSwitch}>
      {isDark ? (
        <Icon text="light">
          <FiSun size={36} color="#94a3b8" />
        </Icon>
      ) : (
        <Icon text="dark">
          <FiMoon size={36} color="#475569" />
        </Icon>
      )}
    </div>
  );
}

export default Theme;
