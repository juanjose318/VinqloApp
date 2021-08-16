import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDegreeComponent } from './create-degree.component';

describe('CreateDegreeComponent', () => {
  let component: CreateDegreeComponent;
  let fixture: ComponentFixture<CreateDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDegreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
