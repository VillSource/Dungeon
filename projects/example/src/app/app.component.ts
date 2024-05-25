import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DungeonComponent, DungeonGithubService } from "dungeon";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, DungeonComponent]
})
export class AppComponent implements OnInit {
  private owner = "villsource";
  private repo = "Dungeon";
  private branch = "dev";

  title = 'example';
  tree: string[] = []
  content: string = ""

  constructor(private ghDungeon: DungeonGithubService) { }

  async ngOnInit() {
    const res = await this.ghDungeon.getRepoTree(this.owner, this.repo, this.branch)
    const tmp = res.map(i => i.path ?? "");
    this.tree = tmp
  }

  async onSelected(file:string){
    const res = await this.ghDungeon.getRepoContent(this.owner, this.repo,this.branch, file);
    this.content = res;
  }

}
