import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DungeonGithubService } from 'dungeon';

interface ContentBlock {
    type:string,
    style?:string,
    level?:number,
    data?:string,
    ["content-type"]?:string,
    alt?:string,
    src?:string
  }

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit {
  private owner = "villsource";
  private repo = "Dungeon";
  private branch = "contents";

  content: ContentBlock[] = []

  constructor(
    private router: ActivatedRoute,
    private ghDungeon: DungeonGithubService
  ){}

  ngOnInit(): void {
    this.router.params.subscribe(async param=>{
      const file = `leason/${param["lesson"]}/${param["content"]}.json`
      await this.loadContent(file);
    })
  }

  async loadContent(file: string) {
    const res = await this.ghDungeon.getRepoContent(this.owner, this.repo, this.branch, file);
    this.content = JSON.parse(res) as ContentBlock[];
    console.log(this.content);
  }

}
