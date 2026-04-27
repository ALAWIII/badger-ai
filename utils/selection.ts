export function getSelectedText(): string {
  return window.getSelection()?.toString().trim().replace(/\s+/g, " ") ?? "";
}

export function getSelectedHtml(): string {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return "";
  const range = selection.getRangeAt(0);
  const div = document.createElement("div");
  div.appendChild(range.cloneContents());
  return div.innerHTML;
}

export function getSelectionPosition(): DOMRect | null {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return null;
  return selection.getRangeAt(0).getBoundingClientRect();
}
