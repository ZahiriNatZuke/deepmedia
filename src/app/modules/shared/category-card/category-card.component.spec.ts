import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCradComponent } from './category-card.component';

describe('CategoryCradComponent', () => {
  let component: CategoryCradComponent;
  let fixture: ComponentFixture<CategoryCradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
