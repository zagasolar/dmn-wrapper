import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmnAssetHandlerComponent } from './dmn-asset-handler.component';

describe('DmnAssetHandlerComponent', () => {
  let component: DmnAssetHandlerComponent;
  let fixture: ComponentFixture<DmnAssetHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmnAssetHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmnAssetHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
