///<reference types = "Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})


describe("testjs", () => {
    it.skip('first three test cases language,contact number,currency', () => {
        cy.visit("https://www.almosafer.com/en");


        // Currency check 
        cy.get('[data-testid="Header__CurrencySelector"]').should('contain', "SAR")

        // contact check 

        cy.get('.sc-dRFtgE').should('contain', "96655440000")


        // language check 

        cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "العربية")


    });
    it.skip('test the logo of qitaf', () => {

        cy.visit("https://www.almosafer.com/en");

        cy.get('.sc-ghsgMZ').should('be.visible')

    });

    it.skip('check hotel tab is not selected', () => {
        cy.visit("https://www.almosafer.com/en");
        cy.get('#uncontrolled-tab-example-tab-hotels').should('have.attr', 'aria-selected').and('equal', 'false')

    });

    it.skip('check the depature date and return date', () => {
        cy.visit("https://www.almosafer.com/en")

        const currenDate = new Date()
        const day = currenDate.getDate()

        const expectedForDepature = day + 1
        const expectedForReturn = day + 2

        cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-hcnlBt').should('contain', expectedForDepature)
        cy.get('[data-testid="FlightSearchBox__ToDateButton"] > .sc-hcnlBt').should('contain', expectedForReturn)



    });

    it('randomly change the language of the website and create one assertion for each change ', () => {



        const websites = ["https://www.almosafer.com/en", "https://www.almosafer.com/ar"]

        const RandomIndex = Math.floor(Math.random() * websites.length)


        console.log(RandomIndex)

        cy.visit(websites[RandomIndex])



        cy.url().then((url) => {


            if (url.includes('ar')) {


                //hard way 
                cy.get('.sc-gRnDUn').should('have.attr','src').and('include',"ar")


                // easy way 
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "English")

            } else if (url.includes('en')) {



                //hard way 
                cy.get('.sc-gRnDUn').should('have.attr','src').and('include',"en")


                // easy way 
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', "العربية")



            }

        })



    });
}



);
