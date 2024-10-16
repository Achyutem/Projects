import CheckboxList from "./CheckboxList";
import { useState } from "react";
import { checkboxList } from "./constants";
import styles from "./styles.module.css";

const NestedCheckbox = () => {
  // State to hold the current list of checkboxes (with nested children)
  const [checkList, setCheckList] = useState(checkboxList);

  /**
   * Recursively toggles the checked state of all children of a checkbox.
   * 
   * @param {Array} list - The list of checkboxes to update.
   * @param {boolean} value - The new checked value (true/false).
   */
  const toggleAllChildren = (list: any, value: any) => {
    for (let i = 0; i < list.length; i++) {
      // Set the current checkbox to the given value
      list[i].checked = value;
      // Recursively set the children of the current checkbox
      toggleAllChildren(list[i].children, value);
    }
  };

  /**
   * Recursively performs a depth-first search (DFS) to find and update 
   * the checkbox with the given id and its children.
   * 
   * @param {Array} list - The list of checkboxes to search through.
   * @param {number} id - The id of the checkbox to find.
   * @param {boolean} value - The new checked state for the checkbox.
   * @param {boolean} isFound - Tracks if the checkbox has been found.
   * @returns {boolean} - Returns true if the checkbox was found and updated.
   */
  const dfs = (list: any, id: number, value: boolean, isFound: any) => {
    if (list.length === 0) return isFound;

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        // Update the checkbox state and all its children
        list[i].checked = value;
        isFound = true;
        toggleAllChildren(list[i].children, value);
        break;
      }
      // Recursively search through children
      isFound = dfs(list[i].children, id, value, isFound);
      if (isFound) break; // Stop once found
    }
    return isFound;
  };

  /**
   * Recursively counts the number of active (checked) children and updates 
   * the parent checkbox accordingly.
   * 
   * @param {Array} list - The list of checkboxes to evaluate.
   * @returns {number} - The count of active (checked) children.
   */
  const getActiveChildren = (list: any) => {
    if (list.length === 0) return 0;
    let count = 0;

    for (let i = 0; i < list.length; i++) {
      if (list[i].checked) {
        count += 1;
      }

      if (list[i].children.length === 0) continue;

      // Recursively count the active children
      let childCount = getActiveChildren(list[i].children);

      // Update parent checkbox based on the children's checked status
      if (childCount !== list[i].children.length) {
        count = list[i].checked ? count - 1 : count;
        list[i].checked = false; // If not all children are checked, uncheck parent
      } else {
        count = list[i].checked ? count : count + 1;
        list[i].checked = true; // If all children are checked, check parent
      }
    }
    return count;
  };

  /**
   * Handles checkbox changes, updating the state of the clicked checkbox 
   * and its children, and propagating changes upwards if necessary.
   * 
   * @param {number} id - The id of the checkbox that was clicked.
   * @param {boolean} value - The new checked state of the checkbox.
   */
  const handleChange = (id: number, value: any) => {
    // Deep clone the checkbox list to avoid directly mutating the state
    let clone = JSON.parse(JSON.stringify(checkList));
    let isFound = false;
    let parentIndex = 0;

    // Find and update the checkbox in the top-level list
    for (let i = 0; i < clone.length; i++) {
      if (clone[i].id === id) {
        clone[i].checked = value;
        isFound = true;
        parentIndex = i;
        toggleAllChildren(clone[i].children, value);
        break;
      }

      // If not found at the top level, search recursively in children
      isFound = dfs(clone[i].children, id, value, false);

      if (isFound) {
        parentIndex = i;
        break;
      }
    }

    // Recount the active children and update the parent checkbox accordingly
    const childCount = getActiveChildren(clone[parentIndex].children);
    if (clone[parentIndex].children.length > 0) {
      if (childCount !== clone[parentIndex].children.length) {
        clone[parentIndex].checked = false; // Not all children are checked
      } else {
        clone[parentIndex].checked = true; // All children are checked
      }
    }

    // Update the state with the modified list
    setCheckList(clone);
  };

  // Render the CheckboxList component with the current checklist and change handler
  return (
    <div className={styles.nested_wrapper}>
      {
        <CheckboxList
          childCheckBox={checkList}
          onCheckBoxChange={handleChange}
        />
      }
    </div>
  );
};

export default NestedCheckbox;
