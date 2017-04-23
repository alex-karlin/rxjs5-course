import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/delay';

export function retryStrategy({ attempts = 4, delay = 1000 }) {
    return function (errors) {
        return errors
            .scan((acc, value) => {
                acc += 1;
                if (acc < attempts) {
                    return acc;
                }
                else {
                    throw new Error(value);
                }
            }, 0)
            .delay(delay);
    }
}