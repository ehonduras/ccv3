import React, { useState, useEffect } from "react";
import { CallParties } from "../../types/CallParties";
import IdentityDropdown from "./IdentityDropdown";

interface IdentityProps {
  callParty: CallParties;
  identity: string;
  identityToDisable: string;
  identitySet: React.Dispatch<React.SetStateAction<string>>;
}

const Identity: React.FC<IdentityProps> = ({
  callParty,
  identity,
  identityToDisable,
  identitySet
}) => {
  const [isShowDropdown, isShowDropdownSet] = useState(false);

  const toggleDropdown = () => {
    isShowDropdownSet(!isShowDropdown);
  };

  return (
    <div className="identityContainer">
      <button className="identityPickBtn" onClick={toggleDropdown}>
        {identity ? identity : `Pick ${callParty} identity`}
      </button>
      {isShowDropdown && (
        <IdentityDropdown
          identity={identity}
          identityToDisable={identityToDisable}
          identitySet={identitySet}
          toggleDropdown={toggleDropdown}
        />
      )}
    </div>
  );
};

export default Identity;
