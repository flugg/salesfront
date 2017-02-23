/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScoreboardlistsComponent } from './scoreboardlists.component';

describe('ScoreboardlistsComponent', () => {
  let component: ScoreboardlistsComponent;
  let fixture: ComponentFixture<ScoreboardlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreboardlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sendNew', () => {
    expect(component).toBeTruthy();
  });
});
