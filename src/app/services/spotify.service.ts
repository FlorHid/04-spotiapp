import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('Spotify service ready');
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({ 
      'Authorization': 'Bearer BQDm8LyiseS-nYOulZwYsZSNC7Oz5krf_V5v7mOqPjPPIk3mC7hGO9rd1EuGSnY0oC5UA6La-TQuzBu5914'
    });

    return this.http.get( url, { headers });

  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => data['albums'].items));
  }

  getArtists( term: string ) {

    return this.getQuery(`search?q=${ term }&type=artist&limit=15`)
              .pipe( map( data => data['artists'].items));
  }

  getArtist( id: string ) {

    return this.getQuery(`artists/${ id }`);
              // .pipe( map( data => data['artists'].items));
  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                 .pipe( map( data => data['tracks']));
  }
}
