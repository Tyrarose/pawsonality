describe('Dog Breed Quiz E2E Test', () => {
    beforeEach(() => {
        cy.visit('/'); // Start from the splash screen
        cy.disableAnimations();
    });

    it('should complete the quiz with random answers and reach the results page', () => {      
        // Wait for splash to auto-redirect
        cy.url({ timeout: 5000 }).should('include', '/welcome');

        // Wait until the start button appears and click it
        cy.contains('Let’s go on an adventure!', { timeout: 8000 }).should('be.visible').click({ force: true });

        // Ensure quiz page loads
        cy.url().should('include', '/quiz');

        // Answer 13 questions with an 8-second delay in between
        for (let i = 0; i < 13; i++) {  
            // Wait for the cards to load
            cy.get('.options-grid .card-wrapper', { timeout: 5000 })
                .should('be.visible')
                .then(($cards) => {
                    if ($cards.length > 0) {
                        const randomIndex = Math.floor(Math.random() * $cards.length);
                        cy.wrap($cards[randomIndex]).click();
                    }
                });

            // Wait for animation and reading time before proceeding
            cy.wait(8000);
        }

        // Ensure we navigate to results
        cy.url({ timeout: 10000 }).should('include', '/results');

        // Wait for the progress bar to appear (ensuring results page is loaded)
        cy.get('.progress-bar-container', { timeout: 5000 }).should('be.visible');

        // Check if the result page shows the dog breed
        cy.get('h1', { timeout: 5000 }).should('contain', 'You are a');
    });
});
