import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  newSongs: any[] = [];
  loading: boolean;

  error: boolean;
  messageError: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;


    this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          this.newSongs = data;
          this.loading = false;
        }, ( errorService ) => {

            this.loading = false;
            this.error = true;
            console.log(errorService);
            this.messageError = errorService.error.error.message;

        });
  }

}
