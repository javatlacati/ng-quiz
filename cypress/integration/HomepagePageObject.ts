export class HomepagePageObject {
  public visit(): void {
    cy.visit('/')
  }

  private title(): Cypress.Chainable<string> {
    return cy.title()
  }

  public verifyTitle(expectedTitle: string) {
    this.title().should('equal', expectedTitle)
  }

  private questionSelection(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('mat-select[formControlName=zerothCtrl]')
  }

  public questionSelectionValidationFailed() {
    this.questionSelection().should('have.attr', 'aria-invalid').should('equal', 'true')
  }

  public clickQuestionSelect(): void {
    this.questionSelection().click()
  }

  public verifyQuestionsSelectionLength(length: number) {
    this.getOptionsFromQuestionSelection().should('have.lengthOf', length)
  }

  private getOptionsFromQuestionSelection(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.questionSelection().get('mat-option');
  }

  public getOptionFromQuestionSelectionByText(text: string) {
    return this.getOptionsFromQuestionSelection().contains(text)
  }

  public clickOptionFromQuestionSelectionByText(text: string) {
    this.getOptionFromQuestionSelectionByText(text).click()
  }

  public closeSelect() {
    cy.get('body').click()
  }

  public step0ClickNextButton(): void {
    cy.get('#step0btnNext').click()
  }

  public step1ClickNextButton(): void {
    cy.get('#step1btnNext').click()
  }

  public step2ClickNextButton(): void {
    cy.get('#step2btnNext').click()
  }

  public step3ClickNextButton(): void {
    cy.get('#step3btnNext').click()
  }
  public step4ClickgoToQuizButton(): void {
    cy.get('#goToQuiz').click()
  }

  private categorySelection(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('mat-select[formControlName=firstCtrl]')
  }

  public categorySelectionValidationFailed() {
    this.categorySelection().should('have.attr', 'aria-invalid').should('equal', 'true')
  }

  public clickCategorySelect(): void {
    this.categorySelection().click()
  }

  private getOptionsFromCategorySelection(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.categorySelection().get('mat-option');
  }

  public getOptionFromCategorySelectionByText(text: string) {
    return this.getOptionsFromCategorySelection().contains(text)
  }

  public clickOptionFromCategorySelectionByText(text: string) {
    this.getOptionFromCategorySelectionByText(text).click()
  }

  public verifyCategorySelectionLength(length: number) {
    this.getOptionsFromCategorySelection().should('have.lengthOf', length)
  }

  private difficultySelection(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('mat-select[formControlName=secondCtrl]')
  }

  public clickDifficultySelect(): void {
    this.difficultySelection().click()
  }

  private getOptionsFromDifficultySelection(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.difficultySelection().get('mat-option');
  }

  public getOptionFromDifficultySelectionByText(text: string) {
    return this.getOptionsFromDifficultySelection().contains(text)
  }

  public clickOptionFromDifficultySelectionByText(text: string) {
    this.getOptionFromCategorySelectionByText(text).click()
  }

  public verifyDifficultySelectionLength(length: number) {
    this.getOptionsFromDifficultySelection().should('have.lengthOf', length)
  }

  private questionNumber(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('mat-slider[formControlName=thirdCtrl]')
  }

  public selectQuestionNumber(questions: number) {
    this.questionNumber().focus()
      .type("{rightarrow}".repeat(questions));
  }
}
