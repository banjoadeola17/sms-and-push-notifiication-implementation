/**
 * defines spec for notification object
 */
export type SmsModel = {
  message: string,
  userIds: string[],
  allUsers: Boolean,
  userType: string,
  sender: string,
  type: string,
};

/**
 * defines spec for providers name and action
 */
export type SmsProvider = {
  name: string,
  send: Promise<*>,
};

/**
 * defines spec for a particular vendor (provider)
 */
export type SmsModule = {
  provider: SmsProvider,
};

export const SmsTransporter = (
    provider: SmsProvider,
) => {
  const transport = Object.create(provider);
  return transport;
};

