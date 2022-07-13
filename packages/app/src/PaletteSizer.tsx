import { Button } from "./Button";
import { NumberInput } from "./NumberInput";

export const PaletteSizer = () => {
  return (
    <div>
      <NumberInput name="Width" value="16"></NumberInput>
      <NumberInput name="Height" value="16"></NumberInput>
    </div>
  );
};
