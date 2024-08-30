export enum AlertAction {
  EMAIL = 'email',
  // This can be extended to other actions like SMS, push notifications, etc.
}

export type AlertMetadata = {
  email: string;
};

export type Alert = {
  _id: string;
  contaminant: string;
  lowerThreshold: number;
  upperThreshold: number;
  action: AlertAction;
  metadata: AlertMetadata;
  message: string;
  createdAt: Date;
};
