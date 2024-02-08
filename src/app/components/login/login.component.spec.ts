import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dataServiceMock: Partial<DataService> //Declare a variable for the mock dataservice

  beforeEach(async () => {
    dataServiceMock = {
      username: '' //Initialize the username property for testing purposes
    }
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [{ provide: DataService, useValue: dataServiceMock}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Checks if the username is set correctly
  it('should set username', () => {
    const expectedUsername = 'TestUser';
    component.username = expectedUsername;

    component.setUsername();

    expect(dataServiceMock.username).toEqual(expectedUsername)
  })
});
