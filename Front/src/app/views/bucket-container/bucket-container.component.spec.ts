import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketContainerComponent } from './bucket-container.component';

describe('BucketContainerComponent', () => {
  let component: BucketContainerComponent;
  let fixture: ComponentFixture<BucketContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucketContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
