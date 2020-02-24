import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChipselectComponent } from './chipselect.component';

describe('ChipselectComponent', () => {
  let component: ChipselectComponent;
  let fixture: ComponentFixture<ChipselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipselectComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChipselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
