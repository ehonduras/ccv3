import React from "react";
import { ibIdentities } from "../../functions/ibIdentities";
import { CallParties } from "../../types/CallParties";

interface IdentityDropdownProps {
  identity: string;
  identityToDisable: string;
  identitySet: React.Dispatch<React.SetStateAction<string>>;
  toggleDropdown: () => void;
}

const IdentityDropdown: React.FC<IdentityDropdownProps> = ({
  identity,
  identityToDisable,
  identitySet,
  toggleDropdown
}) => {
  const selectIdentity = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.textContent &&
      identitySet(event.currentTarget.textContent);
    toggleDropdown();
  };

  return (
    <div>
      <div className="identitiesDropdown">
        {ibIdentities
          .filter(
            (item: string) => item != identity && item != identityToDisable
          )
          .map((item, index) => (
            <button type="button" key={index} onClick={selectIdentity}>
              {item}
            </button>
          ))}
      </div>
    </div>
  );
};

export default IdentityDropdown;
