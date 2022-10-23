import { Select } from "./common";
import { memo } from "react";

export default memo(NetworkPicker);

function NetworkPicker(props: {
  value: string;
  onChange?(network: string): void;
}) {
  return (
    <label>
      <span>Network</span>
      <Select
        onChange={(e) => props.onChange?.(e.target.value)}
        value={props.value}
      >
        {networks.map((network) => (
          <option key={network}>{network}</option>
        ))}
      </Select>
    </label>
  );
}

const networks = ["mainnet", "rinkeby", "kovan"];
