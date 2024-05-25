import { Injectable } from '@angular/core';
import { Octokit } from 'octokit';

@Injectable({
  providedIn: 'root'
})
export class DungeonService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class DungeonGithubService {
  private readonly octokit: Octokit;

  constructor(octokit:Octokit) {
    this.octokit = octokit;
  }

  async getRepoTree(owner: string, repo: string, branch: string) {
    const a = await this.octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: branch,
      recursive: "true"
    });

    const rest = a?.data?.tree?.filter(i => i.type == "blob");
    return rest;
    // return JSON.stringify(rest, null, "\t");
  }

  async getRepoContent(owner: string, repo: string, branch: string, path: string) {
    const a = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`)
    const b = await a.text();
    return b;
  }
}
