import { TestBed } from '@angular/core/testing';
import { QuestionSerializationServiceService } from './question-serialization-service.service';

describe('QuestionSerializationServiceService', () => {
  let service: QuestionSerializationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionSerializationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
