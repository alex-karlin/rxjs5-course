import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/retryWhen';
import { retryStrategy } from './retry-strategy';

export function load(url: string) {
    return Observable.defer(() => {
        return Observable
            .fromPromise(fetch(url).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                else {
                    return Promise.reject(response);
                }
            }));
        })
        .retryWhen(retryStrategy({ attempts: 3, delay: 1500 }));
}