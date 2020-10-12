import * as React from 'react';
import { StackActions, DrawerActions } from '@react-navigation/routers';
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function pop(...args) {
  navigationRef.current?.dispatch(StackActions.pop(...args));
}

export function openDrawer(...args) {
  navigationRef.current?.dispatch(DrawerActions.openDrawer(...args));
}