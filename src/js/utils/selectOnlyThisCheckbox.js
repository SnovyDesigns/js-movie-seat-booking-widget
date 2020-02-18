export default function selectOnlyThis(selectedCheckbox, className) {
  const checkboxes = document.querySelectorAll(className);
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  selectedCheckbox.checked = true;
}
