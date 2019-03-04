/* eslint-disable no-empty-function, no-unused-vars */

export default {
  async getExponentPushTokenAsync() {},
  async getDevicePushTokenAsync(config) {},
  async createChannel(channelId, channel) {},
  async deleteChannel(channelId) {},
  async presentLocalNotification(notification) {},
  async presentLocalNotificationWithChannel(notification, channelId) {},
  async scheduleLocalNotification(notification, options) {},
  async scheduleLocalNotificationWithChannel(notification, options, channelId) {},
  async dismissNotification(notificationId) {},
  async dismissAllNotifications() {},
  async cancelScheduledNotification(notificationId) {},
  async cancelAllScheduledNotifications() {},
};
