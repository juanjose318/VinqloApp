import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitComunityComponent } from './init-comunity.component';

describe('InitComunityComponent', () => {
  let component: InitComunityComponent;
  let fixture: ComponentFixture<InitComunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitComunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitComunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
