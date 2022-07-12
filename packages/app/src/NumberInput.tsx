export const NumberInput = (props) => {
  return (
    <fieldset>
      <label>
        {props.name}:
        <input type="number" name="number" value={props.value} />
      </label>
    </fieldset>
  );
};
