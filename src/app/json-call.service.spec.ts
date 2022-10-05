import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JsonCallService } from './json-call.service';
import { JsonFormData } from './core/models/json-form';

describe('JsonCallService', () => {
  let service: JsonCallService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JsonCallService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(JsonCallService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFormData()', () => {
    it('should retrieve the list of json form data', fakeAsync(() => {
      const formData: JsonFormData[] = [
        {
          field: "name",
          label: "Name",
          type: "text",
          hidden: "false",
          mandatory: true
        }, {
          "field": "email",
          label: "Email",
          type: "text",
          hidden: "false",
          mandatory: true
        }, {
          "field": "confirm",
          label: "Checkbox with confirmation",
          type: "check",
          hidden: "false",
          mandatory: true
        }, {
          "field": "hiddenField",
          label: "",
          type: "text",
          hidden: "true",
          mandatory: false
        }
      ];
      const apiResponse = formData;

      let result: JsonFormData[] = [];

      service.getFormData().subscribe((response: JsonFormData[]) => result = response);
      const req = httpMock.expectOne(`/assets/to-render.json`);
      expect(req.request.method).toBe('GET');

      req.flush(apiResponse);
      tick();
      expect(result).toEqual(formData);
    }));

    it('should return an error message when get form data throws error', fakeAsync(() => {
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = { message: 'Form Data not found' };

      service.getFormData().subscribe(
        () => expect(true).toBeFalse(),
        err => expect(err).toBe('Form Data not found')
      );

      httpMock.expectOne('/assets/to-render.json').flush(data, mockErrorResponse);
      tick();
    }));
  });
});
