import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DungeonComponent, DungeonGithubService } from "dungeon";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, DungeonComponent, CommonModule]
})
export class AppComponent implements OnInit {
  private owner = "villsource";
  private repo = "Dungeon";
  private branch = "contents";

  title = 'example';
  tree: string[] = []
  content: string = ""
  rest: any

  constructor(
    private ghDungeon: DungeonGithubService,
    private router: Router
  ) { }

  async ngOnInit() {
    const res = await this.ghDungeon.getRepoTree(this.owner, this.repo, this.branch)
    const tmp = res.map(i => i.path ?? "").filter(i=>! /.info.json$/.test(i));
    this.tree = tmp
    this.rest = JSON.stringify(res, null, '  ');
  }

  async onSelected(file: string) {
    const res = await this.ghDungeon.getRepoContent(this.owner, this.repo, this.branch, file);
    // this.content = res;
    this.rest = res;
    this.router.navigate(["content", ...file.replaceAll(".json","").split('/').slice(1)])
  }

}
