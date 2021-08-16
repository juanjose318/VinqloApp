import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicCategoryComponent } from './academic-category.component';

describe('AcademicCategoryComponent', () => {
  let component: AcademicCategoryComponent;
  let fixture: ComponentFixture<AcademicCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
