/**
 * scoped event Listner.
 * @param item
 * @returns {boolean}
 */
export function ownAddEventListener (scope, type, handler, capture)  {
  scope.addEventListener(type, handler, capture);
  return () => {
    scope.removeEventListener(type, handler, capture);
  }
}
