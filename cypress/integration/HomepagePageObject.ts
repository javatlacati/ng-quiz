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


}
