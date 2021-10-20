/**
 * USAGE
 * Note: all methods are static for now. Maybe rewrite as a mixin in the future.
 *
 * 1. Subscribe/Attach a listener
 * Observer.on('ArbitraryEventLabel', callbackFunction);
 *
 * 2. Dispatch an Event
 * Observer.dispatch('ArbritraryEventLabel', payloadData);
 *
 * 3. (NEEDS WORK) Unsubscribe/Detach a addEventListener
 * Observer.cancel(eventId);
 */

export default class Observer {
  static actions = {};
  static subUid = -1;
  //
  static on(action, callback) {
    if (!Observer.actions[action]) {
      Observer.actions[action] = [];
    }

    let token = ( ++Observer.subUid ).toString();

    Observer.actions[action].push({ token: token, callback: callback });

    return token;
  }
  //
  static dispatch(action, payload) {
    // bail if no subscribers for this 'action'
    if ( !Observer.actions[action] ) {
      return false;
    }

    let subscribers = Observer.actions[action],
        len = subscribers? subscribers.length: 0;

    while (len--) {
      subscribers[len].callback( action, payload );
    }

    return this;
  }
  //
  static cancel(subToken) {
    for (let a in Observer.actions) {
      Observer.actions[a] = Observer.actions[a].filter(el => el.token !== subToken);
      if (!Observer.actions[a].length) {
        delete Observer.actions[a];
      }
    }
  }
}
