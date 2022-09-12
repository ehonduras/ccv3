import React from "react";
import { ibIdentities } from "../../functions/ibIdentities";

interface IdentityDropdownProps {
  identitySet: React.Dispatch<React.SetStateAction<string>>;
  toggleDropdown: () => void;
}

const IdentityDropdown: React.FC<IdentityDropdownProps> = ({
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
        {ibIdentities.map((item, index) => (
          <button type="button" key={index} onClick={selectIdentity}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IdentityDropdown;
