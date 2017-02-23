/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProjectslistComponent } from './projectslist.component';

describe('ProjectslistComponent', () => {
  let component: ProjectslistComponent;
  let fixture: ComponentFixture<ProjectslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sendNew', () => {
    expect(component).toBeTruthy();
  });
});
