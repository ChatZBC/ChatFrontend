// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';

// import { DataService } from '../../services/data.service';
// import { ChatComponent } from './chat.component';

// describe('ChatComponent', () => {
//   let component: ChatComponent;
//   let fixture: ComponentFixture<ChatComponent>;
//   let signalRService: DataService; // Declare SignalRService

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ChatComponent],
//       providers: [DataService] // Provide your SignalRService
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(ChatComponent);
//     component = fixture.componentInstance;
//     signalRService = TestBed.inject(DataService); // Inject SignalRService
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should connect to SignalR on initialization', () => {
//     spyOn(signalRService, 'startConnection').and.returnValue(of(true)); // Mock startConnection method

//     component.ngOnInit();

//     expect(signalRService.startConnection).toHaveBeenCalled();
//   });
// });