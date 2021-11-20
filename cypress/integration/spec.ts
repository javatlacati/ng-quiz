import {HomepagePageObject} from "./HomepagePageObject";

describe('My First Test', () => {
  it('Required validation for first select', () => {
    let home = new HomepagePageObject();
    home.visit();
    home.verifyTitle('NgQuiz');
    home.step0ClickNextButton();
    home.questionSelectionValidationFailed();
  })
  it('Happy path', () => {
    let home = new HomepagePageObject();
    home.visit();
    home.verifyTitle('NgQuiz');
    home.clickQuestionSelect();
    home.verifyQuestionsSelectionLength(6);
    home.clickOptionFromQuestionSelectionByText('Sample questions');
    home.closeSelect();
    home.step0ClickNextButton();
    home.clickCategorySelect();
    home.verifyCategorySelectionLength(1);
    home.clickOptionFromCategorySelectionByText('sample')
    home.closeSelect();
    home.step1ClickNextButton();
    home.clickDifficultySelect();
    home.verifyDifficultySelectionLength(3);
    home.clickOptionFromDifficultySelectionByText('Hard');
    home.clickOptionFromDifficultySelectionByText('Easy');
    home.closeSelect();
    home.step2ClickNextButton();
    home.selectQuestionNumber(2);
    home.step3ClickNextButton();
    home.step4ClickgoToQuizButton();
    cy.url().should('include', '/quiz');
  })
})
