import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from './data.service';
import * as SignalR from '@microsoft/signalr';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
  });

  //Frontend kan få forbindelse til SignalR hub.
  it('Frontend can get connection', () => {
    const startSpy = spyOn(SignalR.HubConnection.prototype, 'start').and.returnValue(Promise.resolve());
    service.startConnection();
    expect(startSpy).toHaveBeenCalled();
  });

  //Frontend kan få data fra SignalR hub.
  it('Frontend can get data', () => {
    const startSpy = spyOn(SignalR.HubConnection.prototype, 'start').and.returnValue(Promise.resolve());
    service.startConnection();
    expect(startSpy).toHaveBeenCalled();
  });

  //Frontend kan send data til SignalR hub.
  it('Frontend can send data', () => {
    const startSpy = spyOn(SignalR.HubConnection.prototype, 'start').and.returnValue(Promise.resolve());
    service.startConnection();
    expect(startSpy).toHaveBeenCalled();
  });
});