import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { DataService } from '../../services/data.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let dataService: jasmine.SpyObj<DataService>; // Use jasmine.SpyObj to create a mock service

  beforeEach(async () => {
    // Create a mock DataService
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['JoinHub']);

    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      providers: [
        { provide: DataService, useValue: dataServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>; // Inject the mock DataService
  });

  it('should call JoinHub method on initialization', () => {
    fixture.detectChanges(); // Trigger component initialization

    expect(dataService.JoinHub).toHaveBeenCalled(); // Check if JoinHub method has been called
  });
});