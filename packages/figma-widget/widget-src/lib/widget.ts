/* eslint-disable @typescript-eslint/unbound-method */

/**
 * This file is an exporter for the Figma widget API.
 */

const { widget } = figma;
const {
  AutoLayout,
  Ellipse,
  Frame,
  Line,
  register: registerWidget,
  SVG,
  Text,
  useSyncedState,
} = widget;

export {
  AutoLayout,
  Ellipse,
  Frame,
  Line,
  registerWidget,
  SVG,
  Text,
  useSyncedState,
};
