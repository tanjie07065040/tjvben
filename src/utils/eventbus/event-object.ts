import { Subject, Subscription } from 'rxjs';

/**
 * 事件对象
 */
export class EventObject {
  /**
   * 事件名称
   */
  event: string;

  /**
   * Subject
   * rxjs实现发布，订阅的类
   */
  subject: Subject<any>;

  /**
   * 订阅者
   *
   * 根据key收集事件的所有订阅者
   */
  subscriptions: Map<string, Subscription>;

  constructor(event: string) {
    this.event = event;
    this.subject = new Subject<any>();
    this.subscriptions = new Map<string, Subscription>();
  }

  /**
   * 订阅事件
   *
   * @param key 事件key
   * @param cb 回调方法
   */
  subscribe(key: string, cb: (...params: any[]) => void) {
    // 如果已有相同key的订阅者，打印日志，直接返回
    if (this.subscriptions.has(key)) {
      console.warn(`RxEvent: ${this.event} - ${key} exist, subscribe faild.`);
      return;
    }
    const subscription = this.subject.subscribe((params: any[]) => {
      cb(...params);
    });
    // 根据key收集事件订阅者的Subscription，用于取消订阅
    this.subscriptions.set(key, subscription);
  }

  /**
   * 发布事件
   *
   * @param params 事件参数
   */
  publish(...params: any[]) {
    this.subject.next(params);
  }

  /**
   * 取消订阅事件
   *
   * @param key 事件key
   */
  unsubscribe(key: string) {
    // 根据key查找Subscription
    const subscription = this.subscriptions.get(key);
    if (subscription) {
      // 取消订阅
      subscription.unsubscribe();
      // 删除Subscription
      this.subscriptions.delete(key);
    } else {
      // 如果没有找到Subscription，打印日志
      console.warn(`RxEvent: ${this.event} - ${key} not exist, unsubscribe faild.`);
    }
  }
}
