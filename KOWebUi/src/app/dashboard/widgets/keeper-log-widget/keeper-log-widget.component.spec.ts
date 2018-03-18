import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeeperLogWidgetComponent } from './keeper-log-widget.component';

describe('KeeperLogWidgetComponent', () => {
  let component: KeeperLogWidgetComponent;
  let fixture: ComponentFixture<KeeperLogWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeeperLogWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeeperLogWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
