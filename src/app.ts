import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/mergeMap';
import { load } from './loader';

const output = document.getElementById('output');
const button = document.getElementById('button');

function renderMovies(movies) {
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.innerText = `${movie.id} - ${movie.title}`;
        output.appendChild(div);
    });
}

Observable.fromEvent(button, 'click')
    .flatMap(e => load('api/movies.json'))
    .subscribe(
        movies => renderMovies(movies),
        error => console.log(`error: ${error}`),
        () => console.log('complete')
    );
