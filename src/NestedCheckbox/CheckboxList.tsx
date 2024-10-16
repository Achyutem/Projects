/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import Checkbox from "./Checkbox";
import styles from './styles.module.css'

const CheckboxList = (props : any) => {
    const {childCheckBox, onCheckBoxChange} = props;

    return(
        <Fragment>
            {childCheckBox.map((childbox : any) => (
                <div key={childbox.id} className={styles.nested_child}>
                    <Checkbox
                        id={childbox.id}
                        isChecked={childbox.checked}
                        onCheckBoxChange={onCheckBoxChange}
                    />
                    {childbox.children.length > 0 && (
                        <CheckboxList
                            childCheckBox={childbox.children}
                            onCheckBoxChange={onCheckBoxChange}
                        />
                    )}
                </div>
            ))}
        </Fragment>
    )
}

export default CheckboxList