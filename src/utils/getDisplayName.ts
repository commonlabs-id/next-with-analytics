/**
 * Gets the `displayName` of a JSX component for dev tools.
 *
 * @param Component The React component to return the `displayName` of.
 * @returns The `displayName` of the component.
 */
export default function getDisplayName<P = any>(Component: React.ComponentType<P>): string {
  return Component.displayName || Component.name || 'Component';
}
