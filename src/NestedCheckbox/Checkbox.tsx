/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css'

const Checkbox = (props : any) => {
  const { id, isChecked, onCheckBoxChange } = props;

  return (
    <label className={styles.nested_label}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onCheckBoxChange(id, !isChecked)}
      />
    </label>
  );
};

export default Checkbox;