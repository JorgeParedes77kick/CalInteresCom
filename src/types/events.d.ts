// Definiciones para eventos de React
export type ClickEventHandlerType = React.MouseEventHandler<HTMLElement>;

export type FocusEventHandlerType = React.FocusEventHandler<HTMLInputElement>;
export type ChangeEventHandlerType = React.ChangeEventHandler<HTMLInputElement>;
export type BlurEventHandlerType = React.FocusEventHandler<HTMLInputElement>;

export type EventHandlerType =
  | FocusEventHandlerType
  | ChangeEventHandlerType
  | BlurEventHandlerType;

export type ClickEventType = React.MouseEvent<HTMLElement, Element>;

export type FocusEventType = React.FocusEvent<HTMLInputElement>;
export type ChangeEventType = React.ChangeEvent<HTMLInputElement>;
export type BlurEventType = React.FocusEvent<HTMLInputElement>;
export type EventType = FocusEventType | ChangeEventType;
