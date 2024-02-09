import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import * as signalR from '@microsoft/signalr'; // Import signalR

describe('DataService', () => {
  let service: DataService;
  let connectionMock: any;

  const mockConnection = jasmine.createSpyObj('DataService', ['JoinHub', 'SendMessage']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: DataService,
      useValue: mockConnection
    }]
  }))

  beforeEach((() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
  }));

  it('should initiate SignalR connection successfully', async () => {
    await service.JoinHub();
    expect(signalR.HubConnectionBuilder).toHaveBeenCalledWith();
    expect(connectionMock.start).toHaveBeenCalledWith({ withCredentials: false });
    expect(console.log).toHaveBeenCalledWith(`SignalR connection success! connectionId: ${connectionMock.connectionId}`);
  });

  //Frontend kan få forbindelse til SignalR hub
  it('Frontend can get connection', () => {
    const startSpy = spyOn(signalR.HubConnection.prototype, 'start').and.returnValue(Promise.resolve());
    expect(startSpy).toHaveBeenCalled();
  });

  it('should handle connection error', async () => {
    const errorMessage = 'Connection error';
    connectionMock.start.and.returnValue(Promise.reject(errorMessage));

    await service.JoinHub();
    expect(signalR.HubConnectionBuilder).toHaveBeenCalledWith();
    expect(connectionMock.start).toHaveBeenCalledWith({ withCredentials: false });
    expect(console.log).toHaveBeenCalledWith(`SignalR connection error: ${errorMessage}`);
  });
});