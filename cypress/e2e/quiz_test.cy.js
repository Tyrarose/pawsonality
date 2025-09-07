describe('Dog Breed Quiz E2E Test', () => {
    beforeEach(() => {
        cy.visit('/'); // Start from the splash screen
        // cy.disableAnimations();
    });

    it('should complete the quiz with random answers and reach the results page', () => {      
        // Wait for splash to auto-redirect
        cy.url({ timeout: 5000 }).should('include', '/welcome');

        // Click the start button
        cy.contains('Let’s go on an adventure!', { timeout: 8000 })
          .should('be.visible')
          .click({ force: true });

        // Ensure quiz page loads
        cy.url().should('include', '/quiz');

        // Answer 13 questions with an 8-second delay in between
        for (let i = 0; i < 13; i++) {  
            cy.get('.options-grid .card-wrapper', { timeout: 5000 })
              .should('be.visible')
              .then(($cards) => {
                  if ($cards.length > 0) {
                      const randomIndex = Math.floor(Math.random() * $cards.length);
                      cy.wrap($cards[randomIndex]).click();
                  }
              });

            cy.wait(8000); // Simulating user reading time
        }

        // Ensure we navigate to results
        cy.url({ timeout: 10000 }).should('include', '/results');

        // Wait for the dog breed result to show
        cy.get('h1', { timeout: 5000 }).should('contain', 'You are a');

        // Extract the breed and write it to a log file
        cy.get('h1 + h1') // Select the second <h1> which contains the breed name
          .invoke('text')
          .then((breed) => {
              cy.writeFile('cypress/logs/dog_breeds.log', `${new Date().toISOString()} - Breed: ${breed}\n`, { flag: 'a+' });
          });
    });
});
