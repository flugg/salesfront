import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vmo-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    localStorage.setItem('currentProject', this.route.parent.snapshot.url[0].path);
  }

}
