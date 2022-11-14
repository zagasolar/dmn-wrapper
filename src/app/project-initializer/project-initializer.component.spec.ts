import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInitializerComponent } from './project-initializer.component';

describe('ProjectInitializerComponent', () => {
  let component: ProjectInitializerComponent;
  let fixture: ComponentFixture<ProjectInitializerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInitializerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInitializerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
