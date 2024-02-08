import { TestBed, async } from '@angular/core/testing';
import { DataService } from './data.service';
import * as signalR from '@microsoft/signalr'; // Import signalR

describe('DataService', () => {
  let service: DataService;
  let connectionMock: any;

  const mockConnection = jasmine.createSpyObj('DataService',['StartConnection','SendMessage']);

  beforeEach(()=> TestBed.configureTestingModule({
    providers: [{
      provide: DataService,
      useValue: mockConnection
    }]
  }))

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
    service = TestBed.inject(DataService);

    // Mocking signalR.HubConnectionBuilder
    connectionMock = {
      start: jasmine.createSpy('start').and.returnValue(Promise.resolve()),
      connectionId: 'fake_connection_id'
    };
    spyOn(signalR, 'HubConnectionBuilder').and.returnValue({
      withUrl: jasmine.createSpy('withUrl').and.returnValue({
        build: jasmine.createSpy('build').and.returnValue(connectionMock)
      })
    });
  }));

  it('should initiate SignalR connection successfully', async () => {
    await service.initiateSignalrConnection();
    expect(signalR.HubConnectionBuilder).toHaveBeenCalledWith();
    expect(connectionMock.start).toHaveBeenCalledWith({ withCredentials: false });
    expect(console.log).toHaveBeenCalledWith(`SignalR connection success! connectionId: ${connectionMock.connectionId}`);
  });

  it('should handle connection error', async () => {
    const errorMessage = 'Connection error';
    connectionMock.start.and.returnValue(Promise.reject(errorMessage));

    await service.initiateSignalrConnection();
    expect(signalR.HubConnectionBuilder).toHaveBeenCalledWith();
    expect(connectionMock.start).toHaveBeenCalledWith({ withCredentials: false });
    expect(console.log).toHaveBeenCalledWith(`SignalR connection error: ${errorMessage}`);
  });
});



/*import { TestBed } from '@angular/core/testing';
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
});*/