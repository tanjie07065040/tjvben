import { EventObject } from './event-object';

/**
 * 事件订阅器
 */
class RxEvent {
  // 收集所有事件
  eventObjects: Map<string, EventObject>;

  constructor() {
    this.eventObjects = new Map<string, EventObject>();
  }

  /**
   * 订阅事件
   *
   * @param event 事件名称
   * @param key 事件key，用于区分相同事件不同的订阅者
   * @param cb 回调方法
   */
  subscribe(event: string, key: string, cb: (...params: any[]) => void) {
    if (!this.eventObjects.has(event)) {
      // 保存新事件的EventObject
      const newEventObject = new EventObject(event);
      this.eventObjects.set(event, newEventObject);
    }
    const eventObject = this.eventObjects.get(event);
    if (eventObject) {
      eventObject.subscribe(key, cb);
    }
  }

  /**
   * 发布事件
   *
   * @param event 事件名称
   * @param params 参数列表
   */
  publish(event: string, ...params: any[]) {
    const eventObject = this.eventObjects.get(event);
    if (eventObject) {
      eventObject.publish(...params);
    }
  }

  /**
   * 取消订阅事件
   *
   * @param event 事件名称
   * @param key 事件key
   */
  unsubscribe(event: string, key: string) {
    const eventObject = this.eventObjects.get(event);
    if (eventObject) {
      eventObject.unsubscribe(key);
    }
  }
}

const rxevent = new RxEvent();

export { rxevent, RxEvent };
