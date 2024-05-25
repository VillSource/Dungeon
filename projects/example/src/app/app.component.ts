import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DungeonComponent } from "dungeon";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, DungeonComponent]
})
export class AppComponent {
  title = 'example';
}
