import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';
import * as SignalR from '@microsoft/signalr';

describe('DataService', () => {
  let service: DataService;
  let signalRServiceSpy: jasmine.SpyObj<DataService>; // changed
  // const hubConnection = new SignalR.HubConnectionBuilder()
  //   .withUrl('https://localhost:7206/chathub?username=' + 'testUser', { withCredentials: false, skipNegotiation: true, transport: SignalR.HttpTransportType.WebSockets })
  //   .build();

  // hubConnection
  //   .start()
  //   .then(() => {
  //     console.log('SignalR connection started');
  //     // Subscribe to data received event
  //     hubConnection.on('MessageReceived', (data) => {
  //       // Emit the received data
  //       console.log(data);
  //     });
  //   })
  //   .catch(err => console.log('Error while starting connection' + err));


  beforeEach(async () => {
    signalRServiceSpy = jasmine.createSpyObj('DataService', ['StartConnection']); // added
    TestBed.configureTestingModule({
      providers: [
        { provide: DataService, useValue: signalRServiceSpy }, // changed
      ],
    }).compileComponents();
    
    service = TestBed.inject(DataService);
    service.startConnection('https://localhost:7206/chathub')

  });

  // Frontend can establish connection to SignalR hub
  // it('should establish connection to SignalR hub', () => {
  //   expect(SignalR.HubConnectionBuilder).toHaveBeenCalledWith('https://localhost:7206/chathub?username=TestUser', {
  //     withCredentials: false,
  //     skipNegotiation: true,
  //     transport: SignalR.HttpTransportType.WebSockets
  //   });
  //   expect(hubConnection.start).toHaveBeenCalled();
  // });

  //Frontend kan få forbindelse til SignalR hub.
  it('Frontend can get connection', () => {
    const startSpy = spyOn(SignalR.HubConnection.prototype, 'start').and.returnValue(Promise.resolve());
    expect(startSpy).toHaveBeenCalled();
  });
  // it('Frontend can get connection', () => {
  //   service.SendMessage("Test")
  //   expect(service.SendMessage).toHaveBeenCalled();
  // });

  //Frontend kan få data fra SignalR hub.
  // it('Frontend can get data', () => {
  //   const startSpy = spyOn(SignalR.HubConnection.prototype, 'start').and.returnValue(Promise.resolve());
  //   service.startConnection();
  //   expect(startSpy).toHaveBeenCalled();
  // });

  //Frontend kan send data til SignalR hub.
  // it('Frontend can send data', () => {
  //   service.startConnection();
  //   service.SendMessage("Test from angular");
  //   expect(service.SendMessage).toHaveBeenCalled();
  // });
});